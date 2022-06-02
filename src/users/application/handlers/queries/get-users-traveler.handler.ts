import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersTravelerQuery } from '../../queries/get-users-traveler.query';
import { getManager } from 'typeorm';
import { GetUsersTravelerDto } from '../../dtos/queries/get-users-traveler.dto';

@QueryHandler(GetUsersTravelerQuery)
export class GetUsersTravelerHandler
  implements IQueryHandler<GetUsersTravelerQuery>
{
  constructor() {}
  async execute(query: GetUsersTravelerQuery) {
    const manager = getManager();
    const sql = `
        SELECT 
          id,
          first_name as firstName,
          last_name as lastName,
          email,
          password
        FROM 
          users
        WHERE
          type = 'T'
        ORDER BY
          last_name, first_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersTravelerDto[] = ormUsers.map(function (ormUser) {
      let userDto = new GetUsersTravelerDto();
      userDto.id = Number(ormUser.id);
      userDto.firstName = ormUser.firstName;
      userDto.lastName = ormUser.lastName;
      userDto.email = ormUser.email;
      userDto.password = ormUser.password;
      return userDto;
    });
    return users;
  }
}
