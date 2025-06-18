import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '@/theme/ThemeProvider';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Static metadata
export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description: 'A beautiful Pomodoro timer with customizable themes',
};

// Viewport configuration
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#121212' },
      { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#323437" />
      </head>
      <body className={inter.className}>
        <CustomThemeProvider>
          <CssBaseline />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
