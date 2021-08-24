export class EncodeError extends Error {

  public constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, EncodeError);
  }

}

export default EncodeError;
