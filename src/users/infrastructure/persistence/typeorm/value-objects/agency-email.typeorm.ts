import { Column } from 'typeorm';

export class AgencyEmailTypeorm {
  @Column('varchar', { name: 'email', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(email: string): AgencyEmailTypeorm {
    return new AgencyEmailTypeorm(email);
  }
}
