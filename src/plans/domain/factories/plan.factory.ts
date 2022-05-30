import { Plan } from "../entities/plan.entity";

export class PlanFactory {
  public static createFrom(
  name: string,  description: string,  price: number,  nameCity: string,  nameCountry: string, nameMoney: string,
  changeValue_money: number, kindCityName: string, kindCityDescription: string, startDate: Date, endDate: Date,clientId: number): Plan {
    return new Plan(name, description, price, nameCity, nameCountry, nameMoney, changeValue_money, kindCityName, kindCityDescription, startDate, endDate, clientId);
  }

  public static withId(){}
}