import { Country } from "./country.value";
import { KindCity } from "./kind_city.value";

export class City{
  private _name: string;
  private _country: Country;
  private _kindCity: KindCity;

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