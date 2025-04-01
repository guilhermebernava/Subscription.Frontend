import { ElementType, FC, ReactNode } from 'react';

type TProviders = {
  children: ReactNode;
  providers: ProviderItem[];
};

type ProviderItem = {
  component: ElementType;
  props?: Record<string, unknown>;
};

export const Providers: FC<TProviders> = ({ children, providers }) => {
  return providers.reduce((acc, { component: Component, props }) => {
    return <Component {...props}>{acc}</Component>;
  }, children);
};

export * from './client-side';
