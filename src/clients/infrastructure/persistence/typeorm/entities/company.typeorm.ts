import { ChildEntity, Column, Unique } from 'typeorm';
import { ClientTypeORM } from './client.typeorm';
import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { CompanyNameTypeORM } from '../value-objects/company-name.typeorm';
import { ClientType } from '../../../../domain/enums/client-type.enum';

@ChildEntity(ClientType.COMPANY)
export class CompanyTypeORM extends ClientTypeORM {
  @Column((type) => CompanyNameTypeORM, { prefix: false })
  public companyName: CompanyNameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}