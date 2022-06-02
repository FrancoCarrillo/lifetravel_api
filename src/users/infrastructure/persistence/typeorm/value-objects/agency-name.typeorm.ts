import { Column } from 'typeorm';

export class AgencyNameTypeorm {
  @Column('varchar', { name: 'agency_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): AgencyNameTypeorm {
    return new AgencyNameTypeorm(name);
  }
}
