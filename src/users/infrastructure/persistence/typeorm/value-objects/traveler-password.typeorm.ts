import { Column } from 'typeorm';

export class TravelerPasswordTypeorm {
  @Column('varchar', { name: 'password', length: 32, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(password: string): TravelerPasswordTypeorm {
    return new TravelerPasswordTypeorm(password);
  }
}
