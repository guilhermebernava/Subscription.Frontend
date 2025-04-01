'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { languages } from '@/translations/langs';
import Flag from 'react-world-flags';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { RootState } from '@/configs';
import { LanguageState, setLanguage } from '@/store';

dayjs.extend(localeData);

export const ChangeLanguage: React.FC = () => {
  const pathname = usePathname();
  const { i18n, t } = useTranslation();
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const selectedLanguage = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLanguage && selectedLanguage !== i18n.language) {
      dayjs.locale(t('date-locale.key'));
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, i18n, t]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = useCallback(
    (lang: LanguageState['language']) => {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        localStorage.setItem('language', lang);

        if (pathname) {
          const path = pathname.split('/');
          path[1] = lang;
          push(path.join('/'));
        }
      }
      handleCloseMenu();
    },
    [i18n, pathname, push, dispatch],
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Flag
        onClick={handleOpenMenu}
        code={i18n.language.toUpperCase()}
        style={countryStyle}
        aria-controls={anchorEl ? 'language-menu' : undefined}
        aria-haspopup="true"
      />
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        sx={{
          '& .MuiList-root': {
            p: 0,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleChangeLanguage(lang.code)} sx={menuItemSx}>
            <Flag code={lang.label} style={countryStyle} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const menuItemSx = { py: 1, px: 0.5 };

const countryStyle = {
  minHeight: 18,
  width: 24,
  borderRadius: 100,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
};
