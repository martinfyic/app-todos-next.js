'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { IoTrashOutline } from 'react-icons/io5';
import { deleteCompleted } from '@/todos/actions/todo-actions';
import * as todosApi from '@/todos';

export const NewTodo = () => {
  const [description, setDescription] = useState('');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;

    await todosApi.createTodo(description);
    setDescription('');
    router.refresh();
  };

  return (
    <form className='flex w-full' onSubmit={onSubmit}>
      <input
        type='text'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='-ml-10 w-6/12 rounded-lg border-2 border-gray-200 py-2 pl-3 pr-3 text-slate-900 outline-none transition-all focus:border-sky-500'
        placeholder='¿Qué necesita ser hecho?'
      />

      <button
        type='submit'
        className='ml-2 flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-white transition-all hover:bg-sky-700'
      >
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={() => deleteCompleted()}
        type='button'
        className='mx-2 flex items-center justify-center rounded bg-red-400 p-2 text-white transition-all hover:bg-red-700'
      >
        <IoTrashOutline />
        <span className='ml-2'>Borrar completados</span>
      </button>
    </form>
  );
};
