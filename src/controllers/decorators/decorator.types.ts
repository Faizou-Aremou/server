import { RequestHandler } from 'express';

export type FactoryDecorator = (
  path?: string
) => (prototypeTarget: any, key: string, desc: RouteHandlerDescriptor) => void;

export type DecoratorFunction = (
  prototypeTarget: any,
  key: string,
  desc: RouteHandlerDescriptor
) => void;


export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
