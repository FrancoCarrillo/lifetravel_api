import { AgencyName } from "src/common/domain/value-objects/agency-name.value";
import { Email } from "src/common/domain/value-objects/email.value";
import { Password } from "src/common/domain/value-objects/password.value";
import { UserType } from "src/users/domain/enums/user-type.enum";
import { AgencyRegistered } from "src/users/domain/events/agency-registered.event";
import User from "../abstract/user.entity";

export default class Agency extends User {

	constructor(
		private name?: AgencyName,
		private email?: Email,
		private password?: Password
	) {
		super(UserType.TRAVELER);
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
