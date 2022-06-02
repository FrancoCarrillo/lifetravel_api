import { Column } from 'typeorm';

export class AgencyPasswordTypeorm {
  @Column('varchar', { name: 'password', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(password: string): AgencyPasswordTypeorm {
    return new AgencyPasswordTypeorm(password);
  }
}
