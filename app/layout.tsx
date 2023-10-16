import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import Navbar from './Navbar';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Track all complaints easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="jade" radius="large">
          <Navbar />
          <main className='p-5'>{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  )
}
