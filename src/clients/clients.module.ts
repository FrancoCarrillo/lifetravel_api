import { OpenClientHandler } from './application/handlers/commands/open-client.handler';
import { ClientOpenedHandler } from './application/handlers/events/client-opened.handler';
import { GetClientsHandler } from './application/handlers/queries/get-clients.handler';
import { GetClientByIdHandler } from './application/handlers/queries/get-client-by.id.handler';
import { ClientTypeORM } from '../common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { ClientsApplicationService } from './application/services/clients-application.service';
import { OpenClientValidator } from './application/validators/open-client.validator';
import { ClientsController } from './api/clients.controller';
import { UserTypeORM } from "../users/infrastructure/persistence/typeorm/entities/user.typeorm";

export const CommandHandlers = [OpenClientHandler];
export const EventHandlers = [ClientOpenedHandler];
export const QueryHandlers = [GetClientsHandler, GetClientByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ClientTypeORM, UserTypeORM])],
  controllers: [ClientsController],
  providers: [
    ClientsApplicationService,
    OpenClientValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ClientsModule {}
