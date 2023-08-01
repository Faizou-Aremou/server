import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';

export function controller(routePrefix: string): (target: Function) => void {
  return (target: Function) => {
    Object.getOwnPropertyNames(target.prototype)
      .filter((key) => key !== 'constructor')
      .forEach((key) => {
        const routeHandler = target.prototype[key];
        const router = AppRouter.getInstance();
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods | undefined = Reflect.getMetadata(
          'method',
          target.prototype,
          key
        );

        if (path && method !== undefined) {
          router[method](`${routePrefix}${path}`, routeHandler);
        }
      });
  };
}
