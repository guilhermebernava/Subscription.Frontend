import { LooksTwo, LooksOne } from '@mui/icons-material';
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
    path: '/page-1',
    text: 'page-1',
    icon: LooksOne,
  },
  {
    path: '/page-2',
    text: 'page-2',
    icon: LooksTwo,
  },
];
