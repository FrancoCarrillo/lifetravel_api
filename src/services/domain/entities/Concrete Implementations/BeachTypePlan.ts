import { TypePlan } from "../Implementation/TypePlan";

export class BeachTypePlan implements TypePlan {
  generateDescription(): string {
    return "In this plan, you'll enjoy the beautiful beaches ";
  }
}