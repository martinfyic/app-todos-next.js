import Image from 'next/image';
import Link from 'next/link';

import { CiLogout } from 'react-icons/ci';
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline } from 'react-icons/io5';

import { SidebarItem } from './';

const NAVLINKS = [
  {
    icon: <IoCalendarOutline size={30} />,
    name: 'Dashboard',
    path: '/dashboard',
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
];

export const Sidebar = () => {
  return (
    <aside className='fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              width={100}
              height={100}
              alt='tailus logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src='https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
            alt=''
            width={50}
            height={50}
            className='m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28'
          />
          <h5 className='mt-4 hidden text-xl font-semibold text-gray-600 lg:block'>
            Cynthia J. Watts
          </h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='mt-8 space-y-2 tracking-wide'>
          {NAVLINKS.map(({ icon, name, path }) => (
            <SidebarItem key={path} icon={icon} name={name} path={path} />
          ))}
        </ul>
      </div>

      <div className='-mx-6 flex items-center justify-between border-t px-6 pt-4'>
        <button className='group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600'>
          <CiLogout />
          <span className='group-hover:text-gray-700'>Logout</span>
        </button>
      </div>
    </aside>
  );
};
