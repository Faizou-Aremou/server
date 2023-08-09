import 'reflect-metadata';
import { FactoryDecorator, DecoratorFunction } from './decorator.types';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function routeBinder(method: string): FactoryDecorator {
  return (path: string = ''): DecoratorFunction => {
    return (prototypeTarget: any, key: string, desc: PropertyDescriptor) => {
      Reflect.defineMetadata(
        MetadataKeys.Path,
        `/${path}`,
        prototypeTarget,
        key
      );
      Reflect.defineMetadata(MetadataKeys.Method, method, prototypeTarget, key);
    };
  };
}

export const get = routeBinder(Methods.Get);
export const put = routeBinder(Methods.Put);
export const post = routeBinder(Methods.Post);
export const del = routeBinder(Methods.Delete);
