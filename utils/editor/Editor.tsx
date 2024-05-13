'use client';

import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Blocks } from './data/Blocks';
import MoonerDownEditor from './components/MoonerDownEditor';

const Editor = () => {
  const [texts, setTexts] = useState<string>('');
  const renders = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <Editing>
        <MoonerDownEditor texts={texts} setTexts={setTexts} renders={renders} />
      </Editing>
      <HalfBox ref={renders}>{Blocks.compile(texts)}</HalfBox>
    </Box>
  );
};

const Editing = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
`;

const HalfBox = styled.div`
  width: calc(50% - 32px);
  height: calc(100% - 40px);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 10px;
  white-space: pre;
`;

const Box = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

export default Editor;
