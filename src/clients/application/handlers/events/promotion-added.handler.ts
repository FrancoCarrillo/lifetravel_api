import { IEventHandler } from "@nestjs/cqrs";
import { PromotionAdded } from "../../../../payments/domain/events/promotion-added.event";
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator";
import { PromotionAddService } from "../../services/promotion-add.service";
import { getManager, Repository } from "typeorm";
import { ClientTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../../../domain/entities/client.entity";
import { UserId } from "../../../../users/domain/value-objects/user-id.value";
import { AccountNumber } from "../../../domain/value-objects/account-number.value";
import { DNI } from "../../../domain/value-objects/dni.value";
import { Miles } from "../../../../common/domain/value-objects/miles.value";
import { ClientMapper } from "../../mappers/client.mapper";
import { ClientId } from "../../../domain/value-objects/client-id.value";

@EventsHandler(PromotionAdded)
export class PromotionAddedHandler implements IEventHandler<PromotionAdded> {
  constructor(
    private readonly promotionAddService : PromotionAddService,
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async handle(event: PromotionAdded){
    console.log("Client BC - handle Promotion Added");

    let fromClientTypeORM: ClientTypeORM = await this.clientRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.clientId))
      .getOne();

    if(fromClientTypeORM == null){
      console.log("Client not found");
      return;
    }

    const clientId: ClientId = ClientId.of(event.clientId);
    const userId: UserId = UserId.of(fromClientTypeORM.userId.value);
    const accountNumber: AccountNumber = new AccountNumber(fromClientTypeORM.number.value);
    const dni: DNI = new DNI(fromClientTypeORM.dni.value);
    const miles: Miles = new Miles(fromClientTypeORM.miles.value)

    let client: Client = new Client(userId, accountNumber, dni, miles );
    client.changeId(clientId);

    const subtractOk = this.promotionAddService.promotion(client);

    if(!subtractOk){
      console.log('Promotion Subtract error');
      return;
    }

    fromClientTypeORM = ClientMapper.toTypeORM(client);
    await getManager().transaction(async  transactionalEntityManager =>{
      await transactionalEntityManager.save(fromClientTypeORM);

      if(fromClientTypeORM == null){
        console.log('Miles Subtract error')
        return;
      }

    });

  }
}