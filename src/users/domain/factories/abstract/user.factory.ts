import { UserType } from "../../enums/user-type.enum";
import UserCreator from "../creators/abstract/user.creator"
import AgencyFactory from "../creators/concrete/agency.factory";
import TravelerFactory from "../creators/concrete/traveler.factory";

export default class UserFactory {
	//factory method
	public static getUser(userType: UserType): UserCreator {

		switch (userType) {
			case UserType.TRAVELER:
				return new TravelerFactory();
			case UserType.AGENCY:
				return new AgencyFactory();
			default:
				return new TravelerFactory();
		}
	}
}