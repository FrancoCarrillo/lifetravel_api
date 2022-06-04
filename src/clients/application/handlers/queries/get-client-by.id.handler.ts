import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientByIdQuery } from '../../queries/get-client-by-id.query';
import { getManager } from 'typeorm';
import { GetClientsDto } from '../../dtos/queries/get-clients.dto';

@QueryHandler(GetClientByIdQuery)
export class GetClientByIdHandler implements IQueryHandler<GetClientByIdQuery> {
  constructor() {}

  async execute(query: GetClientByIdQuery) {
    const manager = getManager();
    const sql = `
        SELECT
            c.id,
            c.user_id,
            c.account_number,
            c.dni,
            c.miles
        FROM
            clients c
        WHERE
            c.id = ?;`;
    const ormClients = await manager.query(sql, [query.clientId]);
    if (ormClients.length <= 0) {
      return {};
    }
    const ormClient = ormClients[0];
    let clientDto = new GetClientsDto();
    clientDto.id = Number(ormClient.id);
    clientDto.userId = Number(ormClient.user_id);
    clientDto.miles = Number(ormClient.miles);
    clientDto.dni = ormClient.dni;
    clientDto.number = ormClient.number;
    return clientDto;
  }
}
