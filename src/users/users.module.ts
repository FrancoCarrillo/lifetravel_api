import { RegisterTravelerHandler } from './application/handlers/commands/register-traveler.handler';
import { RegisterAgencyHandler } from './application/handlers/commands/register-agency.handler';
import { TravelerRegisteredHandler } from './application/handlers/events/traveler-registered.handler';
import { AgencyRegisteredHandler } from './application/handlers/events/agency-registered.handler';
import { GetUsersTravelerHandler } from './application/handlers/queries/get-users-traveler.handler';
import { GetUsersAgencyHandler } from './application/handlers/queries/get-users-agency.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeORM } from './infrastructure/persistence/typeorm/entities/user.typeorm';
import { TravelerTypeORM } from './infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { AgencyTypeORM } from './infrastructure/persistence/typeorm/entities/agency.typeorm';
import { UsersController } from './api/users.controller';
import { TravelerApplicationService } from './application/services/traveler-application.service';
import { AgencyApplicationService } from './application/services/agency-application.service';
import { RegisterTravelerValidator } from './application/validators/register-traveler.validator';
import { RegisterAgencyValidator } from './application/validators/register-agency.validator';
import { Module } from '@nestjs/common';

export const CommandHandlers = [RegisterTravelerHandler, RegisterAgencyHandler];
export const EventHandlers = [
  TravelerRegisteredHandler,
  AgencyRegisteredHandler,
];
export const QueryHandlers = [GetUsersTravelerHandler, GetUsersAgencyHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserTypeORM, TravelerTypeORM, AgencyTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    TravelerApplicationService,
    AgencyApplicationService,
    RegisterTravelerValidator,
    RegisterAgencyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class UsersModule {}
