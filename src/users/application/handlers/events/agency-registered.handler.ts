import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AgencyRegistered } from '../../../domain/events/agency-registered.event';

@EventsHandler(AgencyRegistered)
export class AgencyRegisteredHandler
  implements IEventHandler<AgencyRegistered>
{
  constructor() {}

  async handle(event: AgencyRegistered) {
    console.log('handle logic for AgencyRegistered');
    console.log(event);
  }
}
