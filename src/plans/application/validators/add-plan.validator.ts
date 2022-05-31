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
    addPlanRequestDto: AddPlanRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const price: number = addPlanRequestDto.price;
    if(price <= 0){
      notification.addError('Price invalid', null);
    }

    const travelDays: number = addPlanRequestDto.travelDays;
    if(travelDays <= 0){
      notification.addError('Travel days invalid', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    //Validad que exista la ciudad en la base de datos
    const cityId: number = addPlanRequestDto.cityId;
    if(cityId <= 0){
      notification.addError('City id invalid', null);
    }

    return notification;
  }
}
