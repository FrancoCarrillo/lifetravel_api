import { User } from './user.entity';
import { AgencyName } from '../../../common/domain/value-objects/agency-name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { UserType } from '../enums/user-type.enum';
import { AgencyRegistered } from '../events/agency-registered.event';
import { UserId } from '../value-objects/user-id.value';

export class Agency extends User {
  private name: AgencyName;
  private email: Email;
  private password: Password;

  public constructor(name: AgencyName, email: Email, password: Password) {
    super(UserType.AGENCY);
    this.name = name;
    this.email = email;
    this.password = password;
  }
  public register() {
    const event = new AgencyRegistered(
      this.id.getValue(),
      this.name.getValue(),
      this.email.getValue(),
      this.password.getValue(),
    );
    this.apply(event);
  }
  public getId(): UserId {
    return this.id;
  }

  public getName(): AgencyName {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public changeName(name: AgencyName): void {
    this.name = name;
  }
}
