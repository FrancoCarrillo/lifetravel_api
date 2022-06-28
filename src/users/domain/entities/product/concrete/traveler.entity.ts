import User from "../abstract/user.entity";
import { TravelerName } from '../../../../../common/domain/value-objects/traveler-name.value';
import { Email } from '../../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../../common/domain/value-objects/password.value';
import { UserType } from '../../../enums/user-type.enum';
import { UserId } from '../../../value-objects/user-id.value';
import { TravelerRegistered } from '../../../events/traveler-registered.event';

export default class Traveler extends User {

	public constructor(
		private name?: TravelerName,
		private email?: Email,
		private password?: Password) {
		super(UserType.TRAVELER);
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
