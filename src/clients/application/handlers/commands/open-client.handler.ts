import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OpenClient } from '../../commands/open-client.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { DNI } from '../../../domain/value-objects/dni.value';
import { Miles } from '../../../../common/domain/value-objects/miles.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { Client } from '../../../domain/entities/client.entity';
import { ClientFactory } from '../../../domain/factories/client.factory';
import { ClientMapper } from '../../mappers/client.mapper';
import { ClientId } from '../../../domain/value-objects/client-id.value';

@CommandHandler(OpenClient)
export class OpenClientHandler implements ICommandHandler<OpenClient> {
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: OpenClient) {
    let clientId: number = 0;
    const clientNumberResult: Result<AppNotification, AccountNumber> =
      AccountNumber.create(command.number);
    if (clientNumberResult.isFailure()) {
      return clientId;
    }
    const dniResult: Result<AppNotification, DNI> = DNI.create(command.dni);
    if (dniResult.isFailure()) {
        return clientId;
    }
    const miles: Miles = Miles.create(300);
    const userId: UserId = UserId.of(command.userId);
    let client: Client = ClientFactory.createFrom(
      userId,
      clientNumberResult.value,
      dniResult.value,
      miles,
    );
    let clientTypeORM: ClientTypeORM = ClientMapper.toTypeORM(client);
    clientTypeORM = await this.clientRepository.save(clientTypeORM);
    if (clientTypeORM == null) {
      return clientId;
    }
    clientId = Number(clientTypeORM.id);
    client.changeId(ClientId.of(clientId));
    client = this.publisher.mergeObjectContext(client);
    client.open();
    client.commit();
    return clientId;
  }
}
