import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TravelerRegistered } from '../../../domain/events/traveler-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(TravelerRegistered)
export class TravelerRegisteredHandler
  implements IEventHandler<TravelerRegistered>
{
  constructor() {}

  async handle(event: TravelerRegistered) {
    console.log('handle logic for TravelerRegistered');
    console.log(event);
  }
}
