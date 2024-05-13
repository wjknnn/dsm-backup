import React, { useRef, useState } from 'react';
import MoonerDownEditor from '@/utils/editor/components/MoonerDownEditor';
import { Blocks } from '@/utils/editor/data/Blocks';
import styled from 'styled-components';
import { RenderDiv } from '@/utils/editor/Style';

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

  return {
    texts,
    Editor,
    Result: <RenderDiv ref={renderRef}>{Blocks.compile(texts)}</RenderDiv>,
  };
};

export default useMoonerDown;
