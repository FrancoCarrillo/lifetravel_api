import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanTypeORM } from '../../infrastructure/persistence/typeorm/entities/plan.typeorm';
import { AddPlanRequestDto } from '../dtos/request/add-plan-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { CityTypeORM } from "../../infrastructure/persistence/typeorm/entities/city.typeorm";

@Injectable()
export class AddPlanValidator {
  constructor(
    @InjectRepository(PlanTypeORM)
    private planRepository: Repository<PlanTypeORM>,
    @InjectRepository(CityTypeORM)
    private cityRepository: Repository<CityTypeORM>,
  ) {}

  public async validate(
    addPlanRequestDto: AddPlanRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const price: number = addPlanRequestDto.price;
    if(price <= 0){
      notification.addError('The price must be greater than zero', null);
    }

    const travelDays: number = addPlanRequestDto.travelDays;
    if(travelDays <= 0){
      notification.addError('The travel days must be greater than zero', null);
    }

    const cityId: number = addPlanRequestDto.cityId;
    if(cityId <= 0){
      notification.addError('The city id must be greater than zero', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    const cityTypeORM: CityTypeORM= await this.cityRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", cityId)
      .getOne();

    if(cityTypeORM == null) {
      notification.addError('City not found', null);
    }

    return notification;
  }
}
