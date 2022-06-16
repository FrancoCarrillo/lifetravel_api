import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MilesAdded } from "src/trip_plan/domain/events/miles-added.event";

@EventsHandler(MilesAdded)
export class MilesAddedHandler implements IEventHandler<MilesAdded> {
    
}