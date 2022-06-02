import { TravelerTypeORM } from '../../infrastructure/persistence/typeorm/entities/traveler.typeorm';
import { Traveler } from '../../domain/entities/traveler.entity';
import { TravelerNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/traveler-name.typeorm';
import { TravelerEmailTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/traveler-email.typeorm';
import { TravelerPasswordTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/traveler-password.typeorm';

export class TravelerMapper {
  public static toTypeORM(traveler: Traveler): TravelerTypeORM {
    const travelerTypeORM: TravelerTypeORM = new TravelerTypeORM();
    travelerTypeORM.name = TravelerNameTypeORM.from(
      traveler.getName().getFirstName(),
      traveler.getName().getLastName(),
    );
    travelerTypeORM.email = TravelerEmailTypeorm.from(
      traveler.getEmail().getValue(),
    );
    travelerTypeORM.password = TravelerPasswordTypeorm.from(
      traveler.getPassword().getValue(),
    );
    return travelerTypeORM;
  }
}
