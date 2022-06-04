import { Column } from 'typeorm';

export class MilesTypeORM {
  @Column('bigint', { name: 'miles', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): MilesTypeORM {
    return new MilesTypeORM(value);
  }
}
