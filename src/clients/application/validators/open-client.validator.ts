import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/client.typeorm';
import { Repository } from 'typeorm';
import { OpenClientRequest } from '../dtos/request/open-client-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class OpenClientValidator {
  constructor(
    @InjectRepository(ClientTypeORM)
    private clientRepository: Repository<ClientTypeORM>,
  ) {}
  public async validate(
    openClientRequestDto: OpenClientRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const number: string = openClientRequestDto.number.trim();
    if (number.length <= 0) {
      notification.addError('Account number is required', null);
    }
    const dni: string = openClientRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('DNI is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const clientTypeORM: ClientTypeORM = await this.clientRepository
      .createQueryBuilder()
      .where('dni = :dni', { dni })
      .getOne();
    if (clientTypeORM != null) {
      notification.addError('DNI is taken', null);
    }
    return notification;
  }
}
