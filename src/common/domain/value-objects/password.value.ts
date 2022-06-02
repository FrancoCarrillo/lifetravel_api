import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

export class Password {
  private value: string;
  private static MAX_LENGTH = 32;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Result<AppNotification, Password> {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('password is required', null);
    }
    if (value.length > this.MAX_LENGTH) {
      notification.addError(
        'The maximum length of a password is ' +
          this.MAX_LENGTH +
          ' characters including spaces',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Password(value));
  }
  public getValue(): string {
    return this.value;
  }
}
