import { AgencyTypeORM } from '../../infrastructure/persistence/typeorm/entities/agency.typeorm';
import { AgencyNameTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-name.typeorm';
import { AgencyEmailTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-email.typeorm';
import { AgencyPasswordTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-password.typeorm';
import User from 'src/users/domain/entities/product/abstract/user.entity';

export class AgencyMapper {
	public static toTypeORM(agency: User): AgencyTypeORM {
		const agencyTypeORM: AgencyTypeORM = new AgencyTypeORM();
		agencyTypeORM.agencyName = AgencyNameTypeorm.from(
			agency.getName().getValue(),
		);
		agencyTypeORM.agencyEmail = AgencyEmailTypeorm.from(
			agency.getEmail().getValue(),
		);
		agencyTypeORM.agencyPassword = AgencyPasswordTypeorm.from(
			agency.getPassword().getValue(),
		);
		return agencyTypeORM;
	}
}
