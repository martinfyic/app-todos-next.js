import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { SidebarItem } from './SidebarItem';
import { LogoutButton } from './LogoutButton';

const NAVLINKS = [
  {
    icon: <IoCalendarOutline size={30} />,
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IoPersonOutline size={30} />,
    name: 'Profile',
    path: '/dashboard/profile',
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    name: 'Rest TODOS',
    path: '/dashboard/rest-todos',
  },
  {
    icon: <IoListOutline size={30} />,
    name: 'Server Actions',
    path: '/dashboard/server-todos',
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    name: 'Cookies',
    path: '/dashboard/cookies',
  },
  {
    icon: <IoBasketOutline size={30} />,
    name: 'Products',
    path: '/dashboard/products',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? 'No name';
  const userAvatarUrl =
    session?.user?.image ??
    'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <aside className='fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              width={150}
              height={150}
              alt='tailus logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={userAvatarUrl}
            alt={userName}
            width={100}
            height={100}
            className='m-auto h-20 w-20 rounded-full object-cover lg:h-28 lg:w-28'
          />
          <h5 className='mt-4 hidden text-xl font-semibold text-gray-600 lg:block'>
            {userName}
          </h5>
          <span className='hidden capitalize text-gray-400 lg:block'>
            {userRoles.join(', ')}
          </span>
        </div>

        <ul className='mt-8 space-y-2 tracking-wide'>
          {NAVLINKS.map(({ icon, name, path }) => (
            <SidebarItem key={path} icon={icon} name={name} path={path} />
          ))}
        </ul>
      </div>
      <div className='-mx-6 flex items-center justify-between border-t px-6 pt-4'>
        <LogoutButton />
      </div>
    </aside>
  );
};
