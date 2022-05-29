import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { getManager, Repository } from 'typeorm';
import { AccountMapper } from '../../mappers/account.mapper';
import { Account } from '../../../domain/entities/account.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { AccountFactory } from '../../../domain/factories/account.factory';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { ClientId } from '../../../../clients/domain/value-objects/client-id.value';
import { AccountId } from '../../../domain/value-objects/account-id.value';
import { MoneyTransferred } from '../../../../transactions/domain/events/money-transferred.event';
import { CompleteTransaction } from '../../../../transactions/application/commands/complete-transaction.command';
import { MoneyTransferService } from 'src/accounts/domain/services/money-transfer.service';

@EventsHandler(MoneyTransferred)
export class MoneyTransferredHandler implements IEventHandler<MoneyTransferred> {
  constructor(
    private readonly moneyTransferService: MoneyTransferService,
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private commandBus: CommandBus
  ) {}

  async handle(event: MoneyTransferred) {
    console.log('Accounts BC - handle MoneyTransferred');
    let fromAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.accountIdFrom))
      .getOne();
    if (fromAccountTypeORM == null) {
      console.log('MoneyTransferred fromAccountTypeORM not found');
      return;
    }
    let toAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.accountIdTo))
      .getOne();
    if (toAccountTypeORM == null) {
      console.log('MoneyTransferred toAccountTypeORM not found');
      return;
    }
    const fromAccountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(fromAccountTypeORM.number.value);
    if (fromAccountNumberResult.isFailure()) {
      return;
    }
    const toAccountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(toAccountTypeORM.number.value);
    if (toAccountNumberResult.isFailure()) {
      return;
    }
    const fromAccountAmount: Money = Money.create(fromAccountTypeORM.balance.balance, fromAccountTypeORM.balance.currency);
    let fromAccount: Account = AccountFactory.withId(AccountId.of(fromAccountTypeORM.id), fromAccountNumberResult.value, fromAccountAmount, ClientId.of(fromAccountTypeORM.clientId.value), null);

    const toAccountAmount: Money = Money.create(toAccountTypeORM.balance.balance, toAccountTypeORM.balance.currency);
    let toAccount: Account = AccountFactory.withId(AccountId.of(toAccountTypeORM.id), toAccountNumberResult.value, toAccountAmount, ClientId.of(toAccountTypeORM.clientId.value), null);

    const transferAmount: Money = Money.create(event.amount, Currency.SOLES);

    const transferOk = this.moneyTransferService.transfer(fromAccount, toAccount, transferAmount);
    if (!transferOk) {
      console.log('MoneyTransferred error');
      return;
    }

    fromAccountTypeORM = AccountMapper.toTypeORM(fromAccount);
    toAccountTypeORM = AccountMapper.toTypeORM(toAccount);

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(fromAccountTypeORM);
      await transactionalEntityManager.save(toAccountTypeORM);
      if (fromAccountTypeORM == null || toAccountTypeORM == null) {
        console.log('MoneyTransferred error');
        return;
      }
      const completeTransaction: CompleteTransaction = new CompleteTransaction(event.transactionId);
      await this.commandBus.execute(completeTransaction);
    });
  }
}