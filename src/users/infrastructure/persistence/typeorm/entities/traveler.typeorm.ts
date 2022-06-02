import { ChildEntity, Column } from 'typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';
import { UserTypeORM } from './user.typeorm';
import { TravelerNameTypeORM } from '../value-objects/traveler-name.typeorm';
import { TravelerEmailTypeorm } from '../value-objects/traveler-email.typeorm';
import { TravelerPasswordTypeorm } from '../value-objects/traveler-password.typeorm';

@ChildEntity(UserType.TRAVELER)
export class TravelerTypeORM extends UserTypeORM {
  @Column((type) => TravelerNameTypeORM, { prefix: false })
  public name: TravelerNameTypeORM;

  @Column((type) => TravelerEmailTypeorm, { prefix: false })
  public email: TravelerEmailTypeorm;

  @Column((type) => TravelerPasswordTypeorm, { prefix: false })
  public password: TravelerPasswordTypeorm;
}
