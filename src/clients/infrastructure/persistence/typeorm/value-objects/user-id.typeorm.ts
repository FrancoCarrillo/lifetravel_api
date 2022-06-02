import { Column } from 'typeorm';

export class UserIdTypeORM {
  @Column('bigint', { name: 'user_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): UserIdTypeORM {
    return new UserIdTypeORM(value);
  }
}
