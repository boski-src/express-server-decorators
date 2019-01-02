export function Catch (message : string, status : number = 400) {
  return (target : object, propertyKey : string, descriptor : TypedPropertyDescriptor<Function>) : any => {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      try {
        return await method.apply(this, args);
      }
      catch (e) {
        if (e.isCustom) throw e;
        else throw { source: e, message, status };
      }
    };

    return descriptor;
  };
}