import { Client } from '../../domain/entities/client.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class MilesAddService {
  public miles(client: Client): boolean {
    const add: Result<AppNotification, Client> = client.addMiles();

    if (add.isFailure()) {
      console.log('Miles Add error');
      return false;
    }

    return true;

  }
}
