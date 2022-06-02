import { TravelerName } from '../../../common/domain/value-objects/traveler-name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Traveler } from '../entities/traveler.entity';

export class TravelerFactory {
  public static createFrom(
    name: TravelerName,
    email: Email,
    password: Password,
  ): Traveler {
    return new Traveler(name, email, password);
  }
}
