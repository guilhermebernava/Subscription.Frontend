'use client';
import '@/styles/global.css';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import { ClientSide } from '@/providers';
import { store } from '@/configs';
import { Initializers, LanguageInitializer, ThemeInitializer } from '@/initializers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="br" cz-shortcut-listen="true">
      <body className={inter.className}>
        <Provider store={store}>
          <Initializers initializers={[LanguageInitializer, ThemeInitializer]}>
            <ClientSide>{children}</ClientSide>
          </Initializers>
        </Provider>
      </body>
    </html>
  );
}
