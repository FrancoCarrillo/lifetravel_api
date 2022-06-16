import { AggregateRoot } from "@nestjs/cqrs";
import { PaymentAdded } from "../events/payment-added.event";
import { PromotionAdded } from "../events/promotion-added.event";

export class Payment extends AggregateRoot {
  private _id: number;
  private _clientId: number;
  private _price: number;

  constructor(id: number, clientId: number, price: number) {
    super();
    this._id = id;
    this._clientId = clientId;
    this._price = price;
  }

  get id(): number {
    return this._id;
  }

  get clientId(): number {
    return this._clientId;
  }

  get price(): number {
    return this._price;
  }

  public changeId(id: number) {
    this._id = id;
  }

  public add() {
    const event = new PaymentAdded(this.id, this.clientId, this.price);
    this.apply(event);
  }
  public addPromotion(){
    const event = new PromotionAdded(this.clientId);
    this.apply(event);
  }
}