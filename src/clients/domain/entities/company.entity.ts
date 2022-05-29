import { ClientId } from '../value-objects/client-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Client } from './client.entity';
import { Ruc } from '../value-objects/ruc.value';
import { ClientType } from '../enums/client-type.enum';
import { CompanyRegistered } from '../events/company-registered.event';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';

export class Company extends Client {
  private name: CompanyName;
  private ruc: Ruc;

  public constructor(name: CompanyName, ruc: Ruc, auditTrail: AuditTrail) {
    super(ClientType.COMPANY, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new CompanyRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): CompanyName {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public changeName(name: CompanyName): void {
    this.name = name;
  }

  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}