import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class CityTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('varchar', { name: 'name', length: 150, nullable: false })
  public name: string;

  @Column('bigint', { name: 'country_id', nullable: false })
  public countryId: number;

  @Column('bigint', { name: 'kind_city_id',  nullable: false })
  public kindCityId: number;
}