import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../value-objects/user-id.value';
import { UserType } from '../enums/user-type.enum';

export class User extends AggregateRoot {
  protected id: UserId;
  protected type: UserType;

  public constructor(type: UserType) {
    super();
    this.type = type;
  }

  public getId(): UserId {
    return this.id;
  }

  public getType(): UserType {
    return this.type;
  }

  public changeId(id: UserId) {
    this.id = id;
  }
}
