export class PackError extends Error {

  public constructor(message?: string) {
    super(message);
    Error.captureStackTrace(this, PackError);
  }

}

export default PackError;
