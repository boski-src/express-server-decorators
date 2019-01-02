import { ValidationError } from 'class-validator';

export class ValidationErrors extends Error {
  public status : number;
  public data : any;

  constructor (validation : ValidationError[]) {
    super('Validation error.');
    this.status = 400;
    this.data = validation;
  }
}