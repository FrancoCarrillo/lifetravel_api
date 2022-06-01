import { Money } from "./money.value";

export class Country {
  private _name: string;
  private _money: Money;

  get name(): string {
    return this._name;
  }

  get money(): Money {
    return this._money;
  }
}