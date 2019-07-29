export class BadCredentialsError extends Error {
  constructor(message) {
    super(message || 'Invalid credentials. Please, try again.');

    this.name = 'BadCredentialsError';
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message || 'Something went wrong. HQ has been notified. Please, try again.');

    this.name = 'ServerError';
  }
}
