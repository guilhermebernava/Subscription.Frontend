'use client';
import { RootState } from '@/configs';
import { Language, setLanguage } from '@/store';
import i18n, { languages } from '@/translations';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ReduxInitializer: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const selectedLanguage = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pathname) return;

    const lang = pathname.split('/')[1] as Language;

    if (lang && languages.some(({ code }) => code === lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang));
        localStorage.setItem('language', lang);
      }
    } else {
      const storedLang = (localStorage.getItem('language') as Language) || 'br';
      dispatch(setLanguage(storedLang));
      i18n.changeLanguage(storedLang);
      router.replace(`/${storedLang}`);
    }
  }, [pathname, router, dispatch]);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  return <>{children}</>;
};
