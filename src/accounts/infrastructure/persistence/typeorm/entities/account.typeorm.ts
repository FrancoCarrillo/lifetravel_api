import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountNumberTypeORM } from '../value-objects/account-number.typeorm';
import { AccountIdTypeORM } from '../value-objects/account-id.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { CustomerIdTypeORM } from '../value-objects/customer-id.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('accounts')
export class AccountTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AccountNumberTypeORM, { prefix: false })
  public number: AccountNumberTypeORM;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => CustomerIdTypeORM, { prefix: false })
  public clientId: CustomerIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}