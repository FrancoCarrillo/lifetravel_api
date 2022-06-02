import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class PaymentTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('bigint', { name: 'client_id', nullable: false })
  public clientId: number;

  @Column('float', { name: 'price', nullable: false })
  public price: number;

}