'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';

const ROUTES = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Events',
    path: '/events/all',
  },
];

function Header() {
  const activePathName = usePathname();

  return (
    <header
      className="
        h-14
        px-3
        sm:px-9
        flex
        items-center
        justify-between
        border-b
        border-white/10
      "
    >
      <Logo />

      <nav className="h-full">
        <ul className="flex gap-x-6 h-full text-sm">
          {ROUTES.map((route) => (
            <li
              key={route.path}
              className={cn(
                'hover:text-white flex items-center relative transition',
                {
                  'text-white': activePathName === route.path,
                  'text-white/50': activePathName !== route.path,
                },
              )}
            >
              <Link href={route.path}>{route.name}</Link>

              {activePathName === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;