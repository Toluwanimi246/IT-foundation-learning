"use client";
import { Lemonada } from 'next/font/google';
import "./globals.css"

import { usePathname } from 'next/navigation';
import Dashboard from './Components/Dashboard.tsx/dashboard';
const lemonada = Lemonada({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/', '/sign-up'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);
  
  return (
    <html lang="en">
      <body>
      {shouldShowNavbar && <Dashboard />}
        {children}
      </body>
    </html>
  );
}

