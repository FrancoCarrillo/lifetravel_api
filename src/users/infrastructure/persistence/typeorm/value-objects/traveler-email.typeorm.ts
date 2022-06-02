import { Column } from 'typeorm';

export class TravelerEmailTypeorm {
  @Column('varchar', { name: 'email', length: 300, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(email: string): TravelerEmailTypeorm {
    return new TravelerEmailTypeorm(email);
  }
}
