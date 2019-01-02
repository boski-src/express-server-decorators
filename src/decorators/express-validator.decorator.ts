import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

import { ITarget } from '../common/interfaces';
import { getObject, ValidationErrors } from '../utils';

const __PARAM__ = 'validator:param';
const __TARGET__ = 'validator:target';

function target (rules, targetKey : string) {
  return (target : object, propertyKey : string, parameterIndex : number) => {
    let params = Reflect.getMetadata(`${__PARAM__}:${propertyKey}`, target, propertyKey) || [];
    let targets = Reflect.getMetadata(`${__TARGET__}:${propertyKey}`, target, propertyKey) || {};

    params.push(parameterIndex);
    targets[parameterIndex] = <ITarget>{ rules, key: targetKey };

    Reflect.defineMetadata(`${__PARAM__}:${propertyKey}`, params, target, propertyKey);
    Reflect.defineMetadata(`${__TARGET__}:${propertyKey}`, targets, target, propertyKey);
  };
}

export function Body (rules) : Function {
  return target(rules, 'body');
}

export function Params (rules) : Function {
  return target(rules, 'params');
}

export function Query (rules) : Function {
  return target(rules, 'query');
}

export function Validate () {
  return (target, propertyKey, descriptor : TypedPropertyDescriptor<Function>) : any => {
    let method = descriptor.value;

    descriptor.value = async (...args) => {
      let errors = [];

      let params = Reflect.getMetadata(`${__PARAM__}:${propertyKey}`, target, propertyKey) || [];
      let targets : ITarget[] = Reflect.getMetadata(`${__TARGET__}:${propertyKey}`, target, propertyKey) || {};

      if (params.length) {
        for (let argIndex in args) {
          let targetValue : ITarget = targets[argIndex];
          if (!targetValue) continue;

          let arg = args[argIndex];
          let targetObject = getObject(arg, targetValue.key);
          if (!targetObject) throw new ValidationErrors([notDefineError(targetValue.key)]);

          let data = plainToClass(targetValue.rules, targetObject);
          let validationErrors = validateSync(data);
          if (validationErrors.length) errors.push(...validationErrors);
        }
      }

      if (errors.length) throw new ValidationErrors(errors);

      return method.apply(new target.constructor(), args);
    };

    return descriptor;
  };
}

function notDefineError (key : string) : ValidationError {
  let error = new ValidationError();
  error.constraints = { 'IsDefined': `"${key}" must be defined.` };
  return error;
}