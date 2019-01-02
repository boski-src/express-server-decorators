export function getObject (obj : object & any, path? : string) : object {
  if (!path) return obj;

  let keys : string[] = path.split('.');
  for (let i = 0; i < keys.length; i++) obj = obj[keys[i]];

  return obj;
}