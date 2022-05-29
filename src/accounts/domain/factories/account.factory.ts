import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Account } from '../entities/account.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { AccountNumber } from '../value-objects/account-number.value';
import { AccountId } from '../value-objects/account-id.value';

export class AccountFactory {
  public static createFrom(number: AccountNumber, balance: Money, clientId: ClientId, auditTrail: AuditTrail): Account {
    return new Account(number, balance, clientId, auditTrail);
  }

  public static withId(accountId: AccountId, number: AccountNumber, balance: Money, clientId: ClientId, auditTrail: AuditTrail): Account {
    let account: Account = new Account(number, balance, clientId, auditTrail);
    account.changeId(accountId);
    return account;
  }
}