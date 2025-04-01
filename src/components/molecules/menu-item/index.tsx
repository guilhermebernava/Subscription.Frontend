'use client';

import React, { forwardRef } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemProps,
  Tooltip,
  SxProps,
  Theme,
} from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface MenuItemProps extends ListItemProps {
  icon: React.ReactElement<SvgIconProps> | React.ReactNode;
  collapsed: boolean;
  text: string;
  menuKey?: string;
  hasSubRoutes?: boolean;
  openSubMenus?: { [key: string]: boolean };
  onToggleSubMenu?: (menuKey: string) => void;
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      icon,
      text,
      menuKey,
      collapsed,
      sx,
      openSubMenus = {},
      hasSubRoutes,
      onClick,
      onToggleSubMenu,
      ...props
    },
    ref,
  ) => {
    const keyUsed = menuKey || text;
    const isOpen = openSubMenus[keyUsed] || false;

    return (
      <Tooltip title={text} disableHoverListener={!collapsed} sx={{ ':hover': { opacity: 0.1 } }}>
        <ListItem
          ref={ref}
          sx={listItemSx(sx, collapsed, hasSubRoutes)}
          onClick={(event) =>
            onToggleSubMenu ? onToggleSubMenu(keyUsed) : onClick && onClick(event)
          }
          {...props}
        >
          <ListItemIcon sx={listItemIconSx(collapsed)}>{icon}</ListItemIcon>
          {!collapsed && <ListItemText primary={text} />}
          {hasSubRoutes && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
      </Tooltip>
    );
  },
);

const listItemIconSx = (collapsed: boolean) => ({
  minWidth: 'fit-content',
  pr: !collapsed ? 2 : 0,
});
const listItemSx = (
  sx?: SxProps<Theme>,
  collapsed?: boolean,
  hasSubRoutes?: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: collapsed ? 'column' : 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  my: 1,
  pb: hasSubRoutes && collapsed ? 0 : 1,
  ...sx,
});

MenuItem.displayName = 'MenuItem';
