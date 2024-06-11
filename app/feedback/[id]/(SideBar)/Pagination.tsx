'use client';

import { Arrow } from '@/assets';
import { popularFeedbackStore } from '@/store';

export const Pagination = () => {
  const { page, max, updatePage } = popularFeedbackStore();
  return (
    <div className="flex items-center justify-center gap-4 px-6">
      <button
        onClick={() => updatePage(page - 1)}
        disabled={page === 1}
        className={`p-2 border rounded-full border-grayLight2 hover:bg-grayLight2 ${
          page === 1 ? 'text-grayDark1' : 'tetx-black'
        }`}
      >
        <Arrow size={20} />
      </button>
      <div className="flex">
        {[...new Array(max)].map((_, index) => (
          <button
            key={index}
            onClick={() => updatePage(index + 1)}
            className={`size-8 rounded-xl ${
              page === index + 1
                ? 'bg-black text-white text-bodyStrong'
                : 'bg-white text-black text-body2'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => updatePage(page + 1)}
        disabled={page === max}
        className={`p-2 border rounded-full border-grayLight2 hover:bg-grayLight2 ${
          page === max ? 'text-grayDark1' : 'tetx-black'
        }`}
      >
        <Arrow size={20} className="rotate-180" />
      </button>
    </div>
  );
};
