export class AppError {
  constructor(public readonly message: string, public readonly cause: Error) {}
}
