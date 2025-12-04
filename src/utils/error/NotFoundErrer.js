const AppError = require('./AppError');

export class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
    console.log(this.statusCode);
  }
}
