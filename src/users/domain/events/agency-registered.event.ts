import { UserRegistered } from './user-registered.event';

export class AgencyRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id);
  }
}
