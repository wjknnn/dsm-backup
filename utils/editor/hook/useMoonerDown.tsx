import React, { useEffect, useRef, useState } from 'react';
import MoonerDownEditor from '@/utils/editor/components/MoonerDownEditor';
import { Blocks } from '@/utils/editor/data/Blocks';

const useMoonerDown = (text?: string) => {
  const [texts, setTexts] = useState<string>(text ?? '');
  const renderRef = useRef<HTMLDivElement>(null);

  const Editor: (placeholder?: string) => React.ReactElement = (
    placeholder?: string
  ) => (
    <MoonerDownEditor
      texts={texts}
      setTexts={setTexts}
      renders={renderRef}
      placeholder={placeholder}
    />
  );

  const clear = () => setTexts('');

  useEffect(() => setTexts(text || ''), [text]);

  return {
    texts,
    Editor,
    Result: (
      <div
        className="flex flex-col flex-1 h-full gap-1 p-3 overflow-y-auto whitespace-pre-line"
        ref={renderRef}
      >
        {Blocks.compile(texts)}
      </div>
    ),
    clear,
  };
};

export default useMoonerDown;
