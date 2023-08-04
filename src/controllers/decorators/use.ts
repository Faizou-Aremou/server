import { RequestHandler } from 'express';
import 'reflect-metadata';
import { FunctionDecorator } from './decorator.types';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler): FunctionDecorator {
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
