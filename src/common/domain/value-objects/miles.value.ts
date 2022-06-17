export class Miles {
  private readonly amount: number;
  private readonly currency: string;

  public constructor(amount: number) {
    this.amount = Number(amount);
  }

  public static create(amount: number): Miles {
    return new Miles(amount);
  }

  public add(): Miles {
    return this.newMiles(this.amount + 50);
  }

  public subtract(): Miles {
    return this.newMiles((this.amount - 300));
  }

  private newMiles(amount: number): Miles {
    return new Miles(amount);
  }

  public getAmount(): number {
    return this.amount;
  }
}
