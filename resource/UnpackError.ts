export class UnpackError extends Error {

  public constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, UnpackError);
  }

}

export default UnpackError;
