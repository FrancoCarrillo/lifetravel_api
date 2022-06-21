import { AgencyName } from "src/common/domain/value-objects/agency-name.value";
import { Email } from "src/common/domain/value-objects/email.value";
import { Password } from "src/common/domain/value-objects/password.value";
import User from "src/users/domain/entities/product/abstract/user.entity";
import Agency from "src/users/domain/entities/product/concrete/agency.entity";
import UserCreator from "../abstract/user.creator";

export default class AgencyFactory extends UserCreator {
	public createUser(name: AgencyName,
		email: Email,
		password: Password): User {
		return new Agency(name, email, password);
	}
}