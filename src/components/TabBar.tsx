// https://tailwindcomponents.com/component/radio-buttons-1
'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);

  const onSelectedTab = (tab: number) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString());
    router.refresh();
  };

  const gridCols = `'grid-cols-'${tabOptions.length}`;

  return (
    <div
      className={`grid  ${gridCols} w-full space-x-2 rounded-xl bg-gradient-to-r from-gray-300 via-slate-100 to-yellow-50 p-2 text-slate-800`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type='radio'
            id={tab.toString()}
            className='peer hidden'
          />
          <label
            onClick={() => onSelectedTab(tab)}
            className='block cursor-pointer select-none rounded-xl p-2 text-center transition-all peer-checked:bg-sky-500 peer-checked:font-bold peer-checked:text-yellow-400'
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
