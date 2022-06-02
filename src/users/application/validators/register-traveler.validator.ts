import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelerTypeORM } from '../../infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { Repository } from 'typeorm';
import { RegisterTravelerRequest } from '../dtos/request/register-traveler-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class RegisterTravelerValidator {
  constructor(
    @InjectRepository(TravelerTypeORM)
    private travelerRepository: Repository<TravelerTypeORM>,
  ) {}
  public async validate(
    registerTravelerRequest: RegisterTravelerRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const firstName: string = registerTravelerRequest.firstName
      ? registerTravelerRequest.firstName.trim()
      : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerTravelerRequest.lastName
      ? registerTravelerRequest.lastName.trim()
      : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const email: string = registerTravelerRequest.email
      ? registerTravelerRequest.email.trim()
      : '';
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }
    const password: string = registerTravelerRequest.password
      ? registerTravelerRequest.password.trim()
      : '';
    if (password.length <= 0) {
      notification.addError('password is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const user: TravelerTypeORM = await this.travelerRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
    if (user != null) {
      notification.addError('email is taken', null);
    }
    return notification;
  }
}
