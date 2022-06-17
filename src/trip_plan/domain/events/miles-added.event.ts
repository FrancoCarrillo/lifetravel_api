import { ClientId } from 'src/clients/domain/value-objects/client-id.value';

export class MilesAdded {
  constructor(public client_id: ClientId) {}
}
