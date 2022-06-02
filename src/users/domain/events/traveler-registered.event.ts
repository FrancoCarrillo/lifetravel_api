import { UserRegistered } from './user-registered.event';

export class TravelerRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id);
  }
}
