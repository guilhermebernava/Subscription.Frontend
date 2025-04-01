'use client';

import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  Drawer,
  List,
  Toolbar,
  Box,
  IconButton,
  SxProps,
  Theme,
  Divider,
  Collapse,
} from '@mui/material';
import { MenuOpen, Menu, Home, AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { MenuItem, ChangeTheme, ChangeLanguage } from '@/components';
import { routes } from '@/routes';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  openInitially?: boolean;
  onClose?: () => void;
}

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

export const Sidebar: FC<SidebarProps> = ({ openInitially = true, onClose }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { t, i18n } = useTranslation();

  const lang = `/${i18n.language}`;
  const [collapsed, setCollapsed] = useState(!openInitially);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), []);
  const toggleSubMenu = useCallback(
    (key: string) => setOpenSubMenus((prev) => ({ ...prev, [key]: !prev[key] })),
    [],
  );

  const drawerSx = useMemo<SxProps<Theme>>(
    () => ({
      width: collapsed ? collapsedDrawerWidth : drawerWidth,
      minHeight: '100vh',
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        justifyContent: 'space-between',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: collapsed ? collapsedDrawerWidth : drawerWidth,
        boxSizing: 'border-box',
      },
    }),
    [collapsed],
  );

  const toolbarSx = useMemo<SxProps<Theme>>(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      px: [1],
    }),
    [collapsed],
  );

  return (
    <Drawer variant="permanent" open={!collapsed} onClose={onClose} sx={drawerSx}>
      <Box role="presentation" sx={{ overflowX: 'hidden' }}>
        <Toolbar sx={toolbarSx}>
          <IconButton onClick={toggleCollapsed}>{collapsed ? <Menu /> : <MenuOpen />}</IconButton>
        </Toolbar>
        <List sx={{ py: 0 }}>
          <MenuItem
            icon={<Home color={lang === pathname ? 'primary' : undefined} />}
            collapsed={collapsed}
            text={t('sidebar.home')}
            onClick={() => push(lang)}
            sx={{
              color: lang === pathname ? 'primary.main' : undefined,
              backgroundColor: lang === pathname ? 'background.default' : undefined,
            }}
          />
          <Divider />

          {routes.map(({ color, icon: Icon, path, text, subRoutes }) => {
            const route = lang + path;
            const hasSubRoutes = !!subRoutes;
            const activeRoute = route === pathname;
            const activeSubRoute = pathname.includes(text);

            return (
              <React.Fragment key={text}>
                <MenuItem
                  menuKey={text}
                  icon={<Icon color={activeRoute || activeSubRoute ? 'primary' : color} />}
                  collapsed={collapsed}
                  text={t(`sidebar.${text}`)}
                  openSubMenus={openSubMenus}
                  hasSubRoutes={hasSubRoutes}
                  onToggleSubMenu={hasSubRoutes ? () => toggleSubMenu(text) : undefined}
                  onClick={hasSubRoutes ? undefined : () => push(route)}
                  sx={{
                    mb: hasSubRoutes ? 0 : 1,
                    color: activeSubRoute || activeRoute ? 'primary.main' : undefined,
                    backgroundColor:
                      activeSubRoute || activeRoute ? 'background.default' : undefined,
                  }}
                />
                {hasSubRoutes && (
                  <Collapse in={openSubMenus[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subRoutes.map((subRoute) => {
                        const subRoutePath = lang + subRoute.path;
                        const activeSubRoute = subRoutePath === pathname;

                        return (
                          <MenuItem
                            key={subRoute.text}
                            menuKey={subRoute.text}
                            icon={<Icon color={activeSubRoute ? 'primary' : subRoute.color} />}
                            collapsed={collapsed}
                            text={t(`sidebar.${subRoute.text}`)}
                            onClick={() => push(subRoutePath)}
                            sx={{
                              pl: collapsed ? 2 : 4,
                              my: 0,
                              color: activeSubRoute ? 'primary.main' : undefined,
                              backgroundColor: activeSubRoute ? 'background.default' : undefined,
                            }}
                          />
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      <Box>
        <List sx={{ py: 0 }}>
          <Divider />
          <MenuItem
            icon={<AccountCircle />}
            text={t('sidebar.profile')}
            collapsed={collapsed}
            onClick={() => console.log('Ir para Perfil')}
          />
          <Divider />
          <Box
            display="flex"
            p={1}
            gap={1}
            flexDirection={collapsed ? 'column-reverse' : 'row'}
            alignItems="center"
          >
            <ChangeTheme />
            <ChangeLanguage />
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};
