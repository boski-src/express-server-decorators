import { ValidationError } from 'class-validator';
export declare class ValidationErrors extends Error {
    status: number;
    data: any;
    constructor(validation: ValidationError[]);
}
