export default class Email {
  private readonly _email: string;

  constructor(email: string) {
    this.validateEmail(email);
    this._email = email;
  }

  private validateEmail(email: string): void {
    if (email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(email)) {
        throw new Error('Invalid email address.');
      }
    }
  }

  public get value(): string {
    return this._email;
  }
}
