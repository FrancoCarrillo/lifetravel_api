import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientsQuery } from '../../queries/get-clients.query';
import { getManager } from 'typeorm';
import { GetClientsDto } from '../../dtos/queries/get-clients.dto';

@QueryHandler(GetClientsQuery)
export class GetClientsHandler implements IQueryHandler<GetClientsQuery> {
  constructor() {}
  async execute(query: GetClientsQuery) {
    const manager = getManager();
    const sql = `
        SELECT
            c.id,
            c.user_id,
            c.number,
            c.dni,
            c.miles,
        FROM
            clients c
         ORDER BY
         c.created_at DESC;`;
    const ormClients = await manager.query(sql);
    if (ormClients.length <= 0) {
      return [];
    }
    const clients: GetClientsDto[] = ormClients.map(function (ormClient) {
      let clientDto = new GetClientsDto();
      clientDto.id = Number(ormClient.id);
      clientDto.userId = Number(ormClient.user_id);
      clientDto.miles = Number(ormClient.miles);
      clientDto.dni = ormClient.dni;
      clientDto.number = ormClient.number;
      return clientDto;
    });
    return clients;
  }
}
