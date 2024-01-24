'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ILinks {
  icon: React.ReactNode;
  name: string;
  path: string;
}

export const SidebarItem = ({ icon, name, path }: ILinks) => {
  const currentPath = usePathname();
  const isActiveLink = currentPath === path;

  return (
    <li>
      <Link
        href={path}
        className={`group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-sky-800 hover:to-cyan-600 hover:text-white ${isActiveLink && 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white'}`}
      >
        {icon}
        <span className='group-hover:text-white'>{name}</span>
      </Link>
    </li>
  );
};
