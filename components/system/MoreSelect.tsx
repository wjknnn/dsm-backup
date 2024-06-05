'use client';

import { ComponentProps, ReactNode, useState } from 'react';

type SelectType = ComponentProps<'button'> & {
  icon?: ReactNode;
  name: string;
};

export const useSelect = <T,>() => {
  const [modal, setModal] = useState<Set<T>>(new Set());

  const toggleModal = (name: T) => {
    const newModal = new Set<T>();
    if (modal.has(name)) newModal.delete(name);
    else newModal.add(name);
    setModal(newModal);
  };

  return { modal, setModal, toggleModal };
};

export const MoreSelect = ({
  list,
  click,
}: {
  list: SelectType[];
  click: () => void;
}) => {
  return (
    <div
      onClick={click}
      className="absolute border border-grayLight1 right-0 min-w-20 w-fit flex flex-col animate-in bg-white p-1 rounded-xl shadow-[0_8px_24px_0_rgba(0,0,0,0.12)]"
    >
      {list.map(({ icon, name, ...props }, index) => (
        <button
          key={index}
          className="flex px-3 py-2 rounded-lg hover:bg-grayLight2"
          {...props}
        >
          <p className="text-nowrap text-start">{name}</p>
        </button>
      ))}
    </div>
  );
};
