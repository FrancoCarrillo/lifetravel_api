export class RangeDate {
  private _startDate: Date;
  private _endDate: Date;

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
}
