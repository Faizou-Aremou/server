import 'reflect-metadata';
import { Router } from 'express';

export const router = Router();

export function controller(routePrefix: string): (target: Function) => void {
  return (target: Function) => {
    Object.getOwnPropertyNames(target.prototype)
      .filter((key) => key !== 'constructor')
      .forEach((key) => {
        const routeHandler = target.prototype[key];
        const path = Reflect.getMetadata('path', target.prototype, key);

        if (path) {
          router.get(`${routePrefix}${path}`, routeHandler);
        }
      });
  };
}
