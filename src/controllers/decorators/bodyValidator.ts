import 'reflect-metadata';
import { DecoratorFunction } from './decorator.types';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]): DecoratorFunction {
  return (prototypeTarget: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, prototypeTarget, key);
  };
}
