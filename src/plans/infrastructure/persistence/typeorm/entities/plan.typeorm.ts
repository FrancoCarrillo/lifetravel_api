import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('plans')
export class PlanTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column( "varchar", {name: 'name', length: 50, nullable: false})
  public  name: string;

  @Column( "varchar", {name: 'description', length: 150, nullable: false})
  public  description: string;

  @Column( "varchar", {name: 'name_city ', length: 50, nullable: false})
  public  nameCity: string;

  @Column( "varchar", {name: 'name_country ', length: 50, nullable: false})
  public  nameCountry: string;

  @Column( "varchar", {name: 'name_money', length: 50, nullable: false})
  public  nameMoney: string;

  @Column( "float", {name: 'change_value_money', nullable: false})
  public  changeValue_money: number;

  @Column( "varchar", {name: 'kind_city_name', length: 50, nullable: false})
  public  kindCityName: string;

  @Column( "varchar", {name: 'kind_city_description', length: 150, nullable: false})
  public  kindCityDescription: string;

  @Column( "float", {name: 'price', nullable: false})
  public  price: number;

  @Column( "datetime", {name: 'start_date', nullable: false})
  public  startDate: Date;

  @Column( "datetime", {name: 'end_date', nullable: false})
  public  endDate: Date;

  @Column( "bigint", {name: 'clients_id', unsigned: true})
  public  clientId: number;
}
