import { Country } from "./country.value";
import { KindCity } from "./kind_city.value";

export class City{

  private _id: number;
  private _name: string;
  private _country: Country;
  private _kindCity: KindCity;

  set id(value: number) {
    this._id = value;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get country(): Country {
    return this._country;
  }

  get kindCity(): KindCity {
    return this._kindCity;
  }
}