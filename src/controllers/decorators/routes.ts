import 'reflect-metadata';

export function get(
  path: string
): (prototypeTarget: any, key: string, desc: PropertyDescriptor) => void {
  return (prototypeTarget: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata('path', path, prototypeTarget, key);
  };
}
