'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CiBookmarkCheck } from 'react-icons/ci';

interface ILinks {
  name: string;
  path: string;
}

export const SidebarItem = ({ name, path }: ILinks) => {
  const currentPath = usePathname();
  const isActiveLink = currentPath === path;

  return (
    <li>
      <Link
        href={path}
        className={`group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 ${isActiveLink && 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white'}`}
      >
        <CiBookmarkCheck size={30} />
        <span className='group-hover:text-gray-700'>{name}</span>
      </Link>
    </li>
  );
};
