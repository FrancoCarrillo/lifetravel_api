import { User } from './user.entity';
import { TravelerName } from '../../../common/domain/value-objects/traveler-name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { UserType } from '../enums/user-type.enum';
import { UserId } from '../value-objects/user-id.value';
import { UserRegistered } from '../events/user-registered.event';
import { TravelerRegistered } from '../events/traveler-registered.event';

export class Traveler extends User {
  private name: TravelerName;
  private email: Email;
  private password: Password;

  public constructor(name: TravelerName, email: Email, password: Password) {
    super(UserType.TRAVELER);
    this.name = name;
    this.email = email;
    this.password = password;
  }
  public register() {
    const event = new TravelerRegistered(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.email.getValue(),
      this.password.getValue(),
    );
    this.apply(event);
  }
  public getId(): UserId {
    return this.id;
  }
  public getName(): TravelerName {
    return this.name;
  }
  public getEmail(): Email {
    return this.email;
  }
  public getPassword(): Password {
    return this.password;
  }
  public changeId(id: UserId) {
    this.id = id;
  }
}
