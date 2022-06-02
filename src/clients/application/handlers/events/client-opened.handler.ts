import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientOpened } from '../../../domain/events/client-opened.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ClientOpened)
export class ClientOpenedHandler implements IEventHandler<ClientOpened> {
  constructor() {}

  async handle(event: ClientOpened) {
    console.log('handle logic for ClientOpened');
    console.log(event);
  }
}
