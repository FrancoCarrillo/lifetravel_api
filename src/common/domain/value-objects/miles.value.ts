export class Miles {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number) {
    this.amount = Number(amount);
  }

  public static create(amount: number): Miles {
    return new Miles(amount);
  }

  public add(other: Miles): Miles {
    return this.newMiles(this.amount + other.getAmount());
  }

  public subtract(other: Miles): Miles {
    return this.newMiles(this.amount - other.getAmount());
  }

  private newMiles(amount: number): Miles {
    return new Miles(amount);
  }

  public getAmount(): number {
    return this.amount;
  }
}
