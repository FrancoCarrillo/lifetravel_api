import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccountNumberTypeORM } from '../../../../../clients/infrastructure/persistence/typeorm/value-objects/account-number.typeorm';
import { UserIdTypeORM } from '../../../../../clients/infrastructure/persistence/typeorm/value-objects/user-id.typeorm';
import { DniTypeORM } from '../../../../../clients/infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { MilesTypeORM } from '../../../../../clients/infrastructure/persistence/typeorm/value-objects/miles.typeorm';

@Entity('clients')
export class ClientTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;
  @Column((type) => UserIdTypeORM, { prefix: false })
  public userId: UserIdTypeORM;

  @Column((type) => AccountNumberTypeORM, { prefix: false })
  public number: AccountNumberTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

  @Column((type) => MilesTypeORM, { prefix: false })
  public miles: MilesTypeORM;
}
