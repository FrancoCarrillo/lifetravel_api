import { GetUsersAgencyQuery } from '../../queries/get-users-agency.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersAgencyDto } from '../../dtos/queries/get-users-agency.dto';

@QueryHandler(GetUsersAgencyQuery)
export class GetUsersAgencyHandler
  implements IQueryHandler<GetUsersAgencyQuery>
{
  constructor() {}
  async execute(query: GetUsersAgencyQuery) {
    const manager = getManager();
    const sql = `
            SELECT
                id,
                agency_name as agencyName,
                email,
                password
            FROM
                users
            WHERE
                type = 'A'
            ORDER BY
                agency_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersAgencyDto[] = ormUsers.map(function (ormUser) {
      const userDto = new GetUsersAgencyDto();
      userDto.id = Number(ormUser.id);
      userDto.agencyName = ormUser.agencyName;
      userDto.email = ormUser.email;
      userDto.password = ormUser.password;
      return userDto;
    });
    return users;
  }
}
