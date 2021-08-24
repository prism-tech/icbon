export class DecodeError extends Error {

  public constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, DecodeError);
  }

}

export default DecodeError;
