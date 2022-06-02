import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { Repository } from 'typeorm';
import { RegisterTraveler } from '../../commands/register-traveler.command';
import { TravelerName } from '../../../../common/domain/value-objects/traveler-name.value';
import { AppNotification } from '../../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { Traveler } from '../../../domain/entities/traveler.entity';
import { TravelerFactory } from '../../../domain/factories/traveler.factory';
import { TravelerMapper } from '../../mappers/traveler.mapper';
import { UserId } from '../../../domain/value-objects/user-id.value';

@CommandHandler(RegisterTraveler)
export class RegisterTravelerHandler
  implements ICommandHandler<RegisterTraveler>
{
  constructor(
    @InjectRepository(TravelerTypeORM)
    private travelerRepository: Repository<TravelerTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterTraveler) {
    let userId:number = 0;
    const travelerNameResult: Result<AppNotification, TravelerName> =
      TravelerName.create(command.firstName, command.lastName);
    if (travelerNameResult.isFailure()) {
      return userId;
    }
    const travelerEmailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );
    if (travelerEmailResult.isFailure()) {
      return userId;
    }
    const travelerPasswordResult: Result<AppNotification, Password> =
      Password.create(command.password);
    if (travelerPasswordResult.isFailure()) {
      return userId;
    }
    let traveler: Traveler = TravelerFactory.createFrom(
      travelerNameResult.value,
      travelerEmailResult.value,
      travelerPasswordResult.value,
    );
    let travelerTypeORM: TravelerTypeORM = TravelerMapper.toTypeORM(traveler);
    travelerTypeORM = await this.travelerRepository.save(travelerTypeORM);
    if (travelerTypeORM == null) {
      return userId;
    }
    userId = Number(travelerTypeORM.id);
    traveler.changeId(UserId.of(userId));
    traveler = this.publisher.mergeObjectContext(traveler);
    traveler.register();
    traveler.commit();
    return userId;
  }
}
