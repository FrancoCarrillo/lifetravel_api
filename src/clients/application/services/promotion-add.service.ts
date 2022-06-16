import { Client } from "../../domain/entities/client.entity";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class PromotionAddService{
  public promotion(client: Client): boolean
  {
    const subtract: Result<AppNotification, Client> = client.subtractMiles();

    if (subtract.isFailure()) {
      console.log('Miles Subtract error')
      return false
    }
    return true;
  }
}