import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    keys.forEach((key) => {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    });
    next();
  };
}
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
          MetadataKeys.Method,
          target.prototype,
          key
        );
        const middlewares: RequestHandler[] =
          Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ??
          [];

        const requireBodyProps =
          Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ??
          [];
        const validatorMiddleware = bodyValidators(requireBodyProps);

        if (path && method !== undefined) {
          router[method](
            `${routePrefix}${path}`,
            [...middlewares, validatorMiddleware],
            routeHandler
          );
        }
      });
  };
}
