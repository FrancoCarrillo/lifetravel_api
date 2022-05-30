import { AggregateRoot } from "@nestjs/cqrs";
import { City } from "../value-object/city.value";
import { RangeDate } from "../value-object/range-date.value";
import { PlanAdded } from "../events/plan-added.event";

export class Plan extends AggregateRoot {
  private _id: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _city: City;
  private _rangeDate: RangeDate;
  private _clientId: number;

  constructor(name, description, price, nameCity, nameCountry, nameMoney, changeValue_money, kindCityName, kindCityDescription, startDate, endDate, clientId) {
    super();
  }

  public open() {
    const event = new PlanAdded(
      this.id,
      this.name,
      this.description,
      this.city.name,
      this.city.country.name,
      this.city.country.money.name,
      this.city.country.money.changeValue,
      // this.kindCityName: string,
      // this.kindCityDescription: string,
      this.price,
      this.rangeDate.startData,
      this.rangeDate.endDate,
      this.clientId,
    );
    this.apply(event);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get city(): City {
    return this._city;
  }

  get rangeDate(): RangeDate {
    return this._rangeDate;
  }

  get clientId(): number {
    return this._clientId;
  }

  public changeId(id: number) {
    this._id = id;
  }
}