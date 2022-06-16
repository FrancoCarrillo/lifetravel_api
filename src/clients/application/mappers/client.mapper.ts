import { ClientTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { Client } from '../../domain/entities/client.entity';
import { AccountNumberTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-number.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { UserIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/user-id.typeorm';
import { MilesTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/miles.typeorm';

export class ClientMapper {
  public static toTypeORM(client: Client): ClientTypeORM {
    const clientTypeORM: ClientTypeORM = new ClientTypeORM();

    clientTypeORM.id = client.getId() != null ? client.getId().getValue() : 0;
    clientTypeORM.number =
      client.getAccountNumber() != null
        ? AccountNumberTypeORM.from(client.getAccountNumber().getValue())
        : null;
    clientTypeORM.dni =
      client.getDni() != null
        ? DniTypeORM.from(client.getDni().getValue())
        : null;
    clientTypeORM.userId =
      client.getUserId() != null
        ? UserIdTypeORM.from(client.getUserId().getValue())
        : null;
    clientTypeORM.miles =
      client.getMiles() != null
        ? MilesTypeORM.from(client.getMiles().getAmount())
        : null;
    return clientTypeORM;
  }
}
