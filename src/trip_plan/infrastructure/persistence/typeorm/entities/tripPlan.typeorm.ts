import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trip_plans')
export class TripPlanTypeORM {

	@PrimaryGeneratedColumn('increment', {
		type: 'bigint',
		name: 'id',
		unsigned: true,
	})
	public id: number;

	@Column()
	public payment_id: number;

	@Column()
	public client_id: number;

	@Column()
	public plan_id: number;

	@Column()
	public promotion: number;
}
