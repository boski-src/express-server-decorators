export class HttpError extends Error {
  public status : number;
  public isCustom : boolean;

  constructor (message : string, status : number) {
    super(message);
    this.status = status;
    this.isCustom = true;
  }
}