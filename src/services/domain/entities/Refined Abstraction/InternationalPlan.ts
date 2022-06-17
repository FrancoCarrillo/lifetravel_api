import { Plan } from "../Abastraction/plan.entity";

export class InternationalPlan extends Plan {
  public changePrice(): void {
    const changeSolesDollarValue:number = 0.27;
    this._price *= changeSolesDollarValue;
  }
}