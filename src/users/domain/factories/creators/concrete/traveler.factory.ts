import { Email } from "src/common/domain/value-objects/email.value";
import { Password } from "src/common/domain/value-objects/password.value";
import { TravelerName } from "src/common/domain/value-objects/traveler-name.value";
import User from "src/users/domain/entities/product/abstract/user.entity";
import Traveler from "../../../entities/product/concrete/traveler.entity";
import UserCreator from "../abstract/user.creator";

export default class TravelerFactory extends UserCreator {
	public createUser(
		name: TravelerName,
		email: Email,
		password: Password
	): User {
		return new Traveler(name, email, password);
	}
}