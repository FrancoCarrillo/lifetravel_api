import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';

@Entity('users')
@TableInheritance({ column: 'type' })
export class UserTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserType,
    default: UserType.TRAVELER,
  })
  readonly type: UserType;
}
