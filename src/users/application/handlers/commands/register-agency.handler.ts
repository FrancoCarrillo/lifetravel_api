import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAgency } from '../../commands/register-agency.command';
import { AgencyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/agency.typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { AgencyName } from '../../../../common/domain/value-objects/agency-name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { UserId } from '../../../domain/value-objects/user-id.value';
import { AgencyMapper } from '../../mappers/agency.mapper';
import UserFactory from 'src/users/domain/factories/abstract/user.factory';
import { UserType } from 'src/users/domain/enums/user-type.enum';

@CommandHandler(RegisterAgency)
export class RegisterAgencyHandler implements ICommandHandler<RegisterAgency> {
	constructor(
		@InjectRepository(AgencyTypeORM)
		private agencyRepository: Repository<AgencyTypeORM>,
		private publisher: EventPublisher,
	) { }

	async execute(command: RegisterAgency) {
		let userId: number = 0;
		const agencyNameResult: Result<AppNotification, AgencyName> =
			AgencyName.create(command.name);
		if (agencyNameResult.isFailure()) {
			return userId;
		}
		const agencyEmailResult: Result<AppNotification, Email> = Email.create(
			command.email,
		);
		if (agencyEmailResult.isFailure()) {
			return userId;
		}
		const agencyPasswordResult: Result<AppNotification, Password> =
			Password.create(command.password);
		if (agencyPasswordResult.isFailure()) {
			return userId;
		}

		let userAgency = UserFactory.getUser(UserType.AGENCY)
		let agency = userAgency.createUser(agencyNameResult.value,
			agencyEmailResult.value,
			agencyPasswordResult.value)
			
		let agencyTypeORM: AgencyTypeORM = AgencyMapper.toTypeORM(agency);
		agencyTypeORM = await this.agencyRepository.save(agencyTypeORM);
		if (agencyTypeORM == null) {
			return userId;
		}
		userId = Number(agencyTypeORM.id);
		agency.changeId(UserId.of(userId));
		agency = this.publisher.mergeObjectContext(agency);
		agency.register();
		agency.commit();
		return userId;
	}
}
