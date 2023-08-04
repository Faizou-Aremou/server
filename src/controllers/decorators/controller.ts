import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function controller(routePrefix: string): (target: Function) => void {
  return (target: Function) => {
    Object.getOwnPropertyNames(target.prototype)
      .filter((key) => key !== 'constructor')
      .forEach((key) => {
        const routeHandler = target.prototype[key];
        const router = AppRouter.getInstance();
        const path = Reflect.getMetadata(
          MetadataKeys.Path,
          target.prototype,
          key
        );
        const method: Methods | undefined = Reflect.getMetadata(
          MetadataKeys.Path,
          target.prototype,
          key
        );
        const middlewares: RequestHandler[] = Reflect.getMetadata(
          MetadataKeys.Middleware,
          target,
          key
        );
        if (path && method !== undefined) {
          router[method](`${routePrefix}${path}`, ...middlewares ,routeHandler);
        }
      });
  };
}
