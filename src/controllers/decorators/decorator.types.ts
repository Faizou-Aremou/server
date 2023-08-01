export type FactoryDecorator = (
  path: string
) => (prototypeTarget: any, key: string, desc: PropertyDescriptor) => void;

export type FunctionDecorator = (
  prototypeTarget: any,
  key: string,
  desc: PropertyDescriptor
) => void;
