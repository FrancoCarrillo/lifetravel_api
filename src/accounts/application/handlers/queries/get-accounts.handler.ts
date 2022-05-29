import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetAccountsQuery } from '../../queries/get-accounts.query';
import { GetAccountsDto } from '../../dtos/queries/get-accounts.dto';

@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler implements IQueryHandler<GetAccountsQuery> {
  constructor() {}

  async execute(query: GetAccountsQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.client_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      accounts a
    ORDER BY
      a.created_at DESC;`;
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return [];
    }
    const accounts: GetAccountsDto[] = ormAccounts.map(function (ormAccount) {
      let accountDto = new GetAccountsDto();
      accountDto.id = Number(ormAccount.id);
      accountDto.number = ormAccount.number;
      accountDto.balance = Number(ormAccount.balance);
      accountDto.clientId = Number(ormAccount.client_id);
      accountDto.createdAt = ormAccount.created_at;
      accountDto.createdBy = ormAccount.created_by;
      accountDto.updatedAt = ormAccount.updated_at;
      accountDto.updatedBy = ormAccount.updated_by;
      return accountDto;
    });
    return accounts;
  }
}