import { AgencyName } from '../../../common/domain/value-objects/agency-name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Agency } from '../entities/agency.entity';

export class AgencyFactory {
  public static createFrom(
    name: AgencyName,
    email: Email,
    password: Password,
  ): Agency {
    return new Agency(name, email, password);
  }
}
