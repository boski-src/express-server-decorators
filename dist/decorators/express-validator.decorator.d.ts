import 'reflect-metadata';
export declare function Body(rules: any): Function;
export declare function Params(rules: any): Function;
export declare function Query(rules: any): Function;
export declare function Validate(): (target: any, propertyKey: any, descriptor: TypedPropertyDescriptor<Function>) => any;
