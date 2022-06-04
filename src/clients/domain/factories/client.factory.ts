import { AccountNumber } from '../value-objects/account-number.value';
import { DNI } from '../value-objects/dni.value';
import { UserId } from '../../../users/domain/value-objects/user-id.value';
import { Miles } from '../../../common/domain/value-objects/miles.value';
import { Client } from '../entities/client.entity';
import { ClientId } from '../value-objects/client-id.value';

export class ClientFactory {
  public static createFrom(
    userId: UserId,
    number: AccountNumber,
    dni: DNI,
    miles: Miles,
  ): Client {
    return new Client(userId, number, dni, miles);
  }
  public static withId(
    clientId: ClientId,
    number: AccountNumber,
    miles: Miles,
    userId: UserId,
    dni: DNI,
  ): Client {
    const client: Client = new Client(userId, number, dni, miles);
    client.changeId(clientId);
    return client;
  }
}
