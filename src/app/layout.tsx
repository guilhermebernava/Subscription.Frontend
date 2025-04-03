'use client';
import '@/styles/global.css';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import { store } from '@/configs';
import { Initializers, LanguageInitializer, ThemeInitializer } from '@/initializers';
import { ToastProvider } from '@/contexts';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="br" cz-shortcut-listen="true">
      <body className={inter.className} style={{ minHeight: '100dvh' }}>
        <Provider store={store}>
          <Initializers initializers={[LanguageInitializer, ThemeInitializer, ToastProvider]}>
            {children}
          </Initializers>
        </Provider>
      </body>
    </html>
  );
}
