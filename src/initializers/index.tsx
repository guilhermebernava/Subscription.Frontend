import { FC, ReactNode, ComponentType } from 'react';

type TInitializer = ComponentType<{ children: ReactNode }>;

type TInitialize = {
  children: ReactNode;
  initializers: TInitializer[];
};

export const Initializers: FC<TInitialize> = ({ children, initializers }) => {
  return initializers.reduce((acc, Initializer) => {
    return <Initializer>{acc}</Initializer>;
  }, children);
};

export * from './language';
export * from './theme';
export * from './redux';
