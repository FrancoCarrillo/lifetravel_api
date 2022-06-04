import { Column, Unique } from 'typeorm';

export class AccountNumberTypeORM {
  @Column('varchar', { name: 'account_number', length: 20, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): AccountNumberTypeORM {
    return new AccountNumberTypeORM(value);
  }
}
