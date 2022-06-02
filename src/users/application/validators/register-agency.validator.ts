import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyTypeORM } from '../../infrastructure/persistence/typeorm/entities/agency.typeorm';
import { RegisterAgencyRequest } from '../dtos/request/register-agency-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import {UserTypeORM} from "../../infrastructure/persistence/typeorm/entities/user.typeorm";

@Injectable()
export class RegisterAgencyValidator {
  constructor(
    @InjectRepository(AgencyTypeORM)
    private companyRepository: Repository<AgencyTypeORM>,
  ) {}
  public async validate(
    registerAgencyRequest: RegisterAgencyRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerAgencyRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const email: string = registerAgencyRequest.email.trim();
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }
    const password: string = registerAgencyRequest.password.trim();
    if (password.length <= 0) {
      notification.addError('password is required', null);
    }
    const user: UserTypeORM = await this.companyRepository.createQueryBuilder().where("email = :email", { email }).getOne();
    if (user != null) {
      notification.addError('email is taken', null);
    }
    return notification;
  }
}
