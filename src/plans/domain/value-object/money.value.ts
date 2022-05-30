export class Money {
  private _name: string;
  private _changeValue: number;

  get name(): string {
    return this._name;
  }

  get changeValue(): number {
    return this._changeValue;
  }
}