
export class RangeDate {
  private _startData: Date;
  private _endDate: Date;

  get startData(): Date {
    return this._startData;
  }

  get endDate(): Date {
    return this._endDate;
  }
}