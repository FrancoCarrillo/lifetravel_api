import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class DNI {
  private readonly value: string;
  private static MAX_LENGTH = 8;

  public constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Result<AppNotification, DNI> {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('DNI is required', null);
    }
    if (value.length > this.MAX_LENGTH) {
      notification.addError(
        'The maximum length of an DNI is ' +
          this.MAX_LENGTH +
          ' characters including spaces',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DNI(value));
  }

  public getValue(): string {
    return this.value;
  }
}
