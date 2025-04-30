import { Code, Group, LooksOne } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import { SvgIconPropsColorOverrides, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IRoutes {
  path: string;
  text: string;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    SvgIconPropsColorOverrides
  >;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  subRoutes?: ISubRoute[];
}
export interface ISubRoute extends Omit<IRoutes, 'icon' | 'subRoutes'> {
  icon?: IRoutes['icon'];
}

export const routes: IRoutes[] = [
  {
    path: '/subscriptions',
    text: 'subscriptions',
    icon: Group,
  },
  {
    path: '/templates',
    text: 'templates',
    icon: Code,
  },
];
