import { AggregateRoot } from '@nestjs/cqrs';
import { ClientId } from '../value-objects/client-id.value';
import { AccountNumber } from '../value-objects/account-number.value';
import { Miles } from '../../../common/domain/value-objects/miles.value';
import { UserId } from '../../../users/domain/value-objects/user-id.value';
import { DNI } from '../value-objects/dni.value';
import { ClientOpened } from '../events/client-opened.event';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { Res } from '@nestjs/common';

export class Client extends AggregateRoot {
  private id: ClientId;
  private readonly number: AccountNumber;
  private miles: Miles;
  private readonly userId: UserId;
  private readonly dni: DNI;

  public constructor(
    userId: UserId,
    number: AccountNumber,
    dni: DNI,
    miles: Miles,
  ) {
    super();
    this.number = number;
    this.miles = miles;
    this.userId = userId;
    this.dni = dni;
  }

  public open() {
    const event = new ClientOpened(
      this.id.getValue(),
      this.userId.getValue(),
      this.number.getValue(),
      this.dni.getValue(),
    );
    this.apply(event);
  }

  public subtractMiles(): Result<AppNotification, Client> {
    this.miles = this.miles.subtract();
    return Result.ok(this);
  }
  public addMiles(): Result<AppNotification, Client> {
    this.miles = this.miles.add(this.miles);
    return Result.ok(this);
  }

  public getId(): ClientId {
    return this.id;
  }
  public getAccountNumber(): AccountNumber {
    return this.number;
  }
  public getMiles(): Miles {
    return this.miles;
  }
  public getUserId(): UserId {
    return this.userId;
  }
  public getDni(): DNI {
    return this.dni;
  }

  public changeId(id: ClientId) {
    this.id = id;
  }
  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }
  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }
}
