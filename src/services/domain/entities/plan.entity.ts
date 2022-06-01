import { AggregateRoot } from "@nestjs/cqrs";
import { City } from "../value-object/city.value";
import { PlanAdded } from "../events/plan-added.event";

export class Plan extends AggregateRoot {
  private _id: number;
  private _price: number;
  private _travelDays: number;
  private _city: City;

  constructor(id: number, price: number, travelDays: number, city: City) {
    super();
    this._id = id;
    this._price = price;
    this._travelDays = travelDays;
    this._city = city;
  }

  get id(): number {
    return this._id;
  }

  get price(): number {
    return this._price;
  }

  get travelDays(): number {
    return this._travelDays;
  }

  get city(): City {
    return this._city;
  }

  public changeId(id: number) {
    this._id = id;
  }

  public open() {
    const event = new PlanAdded(this.id, this.price, this._travelDays, this.city);
    this.apply(event);
  }
}