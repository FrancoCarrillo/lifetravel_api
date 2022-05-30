import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanTypeORM } from '../../infrastructure/persistence/typeorm/entities/plan.typeorm';
import { AddPlanRequestDto } from '../dtos/request/add-plan-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class AddPlanValidator {
  constructor(
    @InjectRepository(PlanTypeORM)
    private planRepository: Repository<PlanTypeORM>,
  ) {}

  public async validate(
    addPlanRequestDTO: AddPlanRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = addPlanRequestDTO.name.trim();
    if (name.length <= 0) {
      notification.addError('Plan name is required', null);
    }
    return notification;
  }
}
