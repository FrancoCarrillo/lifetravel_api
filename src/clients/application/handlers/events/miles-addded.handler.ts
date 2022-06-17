import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MilesAdded } from 'src/trip_plan/domain/events/miles-added.event';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm';
import {getManager, Repository} from 'typeorm';
import { MilesAddService } from '../../services/miles-application.service';
import { ClientId } from '../../../domain/value-objects/client-id.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { DNI } from '../../../domain/value-objects/dni.value';
import { Miles } from '../../../../common/domain/value-objects/miles.value';
import {Client} from "../../../domain/entities/client.entity";
import {ClientMapper} from "../../mappers/client.mapper";

@EventsHandler(MilesAdded)
export class MilesAddedHandler implements IEventHandler<MilesAdded> {
  constructor(
    private readonly milesAddService: MilesAddService,
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}

  async handle(event: MilesAdded) {
    console.log('Client BC - handle Miles Added');
    let fromClientTypeORM: ClientTypeORM = await this.clientRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', Number(event.client_id))
      .getOne();

    if (fromClientTypeORM == null) {
      console.log('Client not found');
      return;
    }

    const clientId: ClientId = ClientId.of(event.client_id);
    const userId: UserId = UserId.of(fromClientTypeORM.userId.value);
    const accountNumber: AccountNumber = new AccountNumber(
      fromClientTypeORM.number.value,
    );
    const dni: DNI = new DNI(fromClientTypeORM.dni.value);
    const miles: Miles = new Miles(fromClientTypeORM.miles.value);

    const client: Client = new Client(userId, accountNumber, dni, miles);
    client.changeId(clientId);

    const addedOk = this.milesAddService.miles(client);

    if (!addedOk) {
      console.log('Miles Add Error');
      return;
    }

    fromClientTypeORM = ClientMapper.toTypeORM(client);
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(fromClientTypeORM);

      if (fromClientTypeORM == null) {
        console.log('Miles Add Error');
        return;
      }
    });
  }
}
