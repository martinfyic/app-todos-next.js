// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />

      <div className='mb-6 ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]'>
        <TopMenu />
        <div className='px-6 pt-6'>{children}</div>
      </div>
    </>
  );
}
