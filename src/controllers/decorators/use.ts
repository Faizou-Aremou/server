import { RequestHandler } from 'express';
import 'reflect-metadata';
import { DecoratorFunction } from './decorator.types';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler): DecoratorFunction {
  return (prototypeTarget: any, key: string, desc: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.Middleware, prototypeTarget, key) ?? [];
    const middlewaresAdded = [...middlewares, middleware];

    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      middlewaresAdded,
      prototypeTarget,
      key
    );
  };
}
