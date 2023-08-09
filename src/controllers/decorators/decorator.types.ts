export type FactoryDecorator = (
  path?: string
) => (prototypeTarget: any, key: string, desc: PropertyDescriptor) => void;

export type DecoratorFunction = (
  prototypeTarget: any,
  key: string,
  desc: PropertyDescriptor
) => void;
