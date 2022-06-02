import { AgencyTypeORM } from '../../infrastructure/persistence/typeorm/entities/agency.typeorm';
import { Agency } from '../../domain/entities/agency.entity';
import { AgencyNameTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-name.typeorm';
import { AgencyEmailTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-email.typeorm';
import { AgencyPasswordTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/agency-password.typeorm';

export class AgencyMapper {
  public static toTypeORM(agency: Agency): AgencyTypeORM {
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
