'use client';
import '@/styles/global.css';
import { ClientSide } from '@/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientSide>{children}</ClientSide>;
}
