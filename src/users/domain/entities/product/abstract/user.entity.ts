import { AggregateRoot } from '@nestjs/cqrs';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { UserType } from 'src/users/domain/enums/user-type.enum';
import { UserId } from '../../../value-objects/user-id.value';

export default abstract class User extends AggregateRoot {
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

	public abstract register(): void;
	public abstract getName(): any;
	public abstract getEmail(): Email;
	public abstract getPassword(): Password;


}
