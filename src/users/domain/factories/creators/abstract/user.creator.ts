import { Email } from "src/common/domain/value-objects/email.value";
import { Password } from "src/common/domain/value-objects/password.value";
import User from "src/users/domain/entities/product/abstract/user.entity";
import { UserType } from "src/users/domain/enums/user-type.enum";
import { UserId } from "src/users/domain/value-objects/user-id.value";

// Creador abstracto
export default abstract class UserCreator {
	// Factory method (concrete)
	public abstract createUser(name?: any, email?: Email, password?: Password): User;

	public getType(): UserType {
		let user: User = this.createUser(); // Factory method for each concrete creator
		return user.getType();
	}

	public getId(): UserId {
		let user: User = this.createUser(); // Factory method for each concrete creator
		return user.getId();
	}

}