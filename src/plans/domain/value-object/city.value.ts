import { Country } from "./country.value";

export class City{
  private _name: string;
  private _country: Country;

  get name(): string {
    return this._name;
  }

  get country(): Country {
    return this._country;
  }
}