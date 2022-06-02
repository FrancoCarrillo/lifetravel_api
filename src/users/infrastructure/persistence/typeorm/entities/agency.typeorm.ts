import { ChildEntity, Column } from 'typeorm';
import { UserTypeORM } from './user.typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';
import { AgencyNameTypeorm } from '../value-objects/agency-name.typeorm';
import { AgencyEmailTypeorm } from '../value-objects/agency-email.typeorm';
import { AgencyPasswordTypeorm } from '../value-objects/agency-password.typeorm';

@ChildEntity(UserType.AGENCY)
export class AgencyTypeORM extends UserTypeORM {
  @Column((type) => AgencyNameTypeorm, { prefix: false })
  public agencyName: AgencyNameTypeorm;

  @Column((type) => AgencyEmailTypeorm, { prefix: false })
  public agencyEmail: AgencyEmailTypeorm;

  @Column((type) => AgencyPasswordTypeorm, { prefix: false })
  public agencyPassword: AgencyPasswordTypeorm;
}
