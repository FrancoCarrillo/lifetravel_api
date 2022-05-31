import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('plans')
export class PlanTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('float', { name: 'price', nullable: false })
  public price: number;

  @Column('int', { name: 'travel_days', nullable: false })
  public travelDays: number;

  @Column('bigint', { name: 'city_id',  nullable: false })
  public cityId: number;

}
