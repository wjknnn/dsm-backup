import { colors } from './components/colors';
import styled from 'styled-components';

export const MDTextArea = styled.textarea`
  padding: 12px;
  resize: none;
  border: none;
  outline: none;
  font-family: Pretendard, Prontandard, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 12px;
  border: 1px soild ${colors.gray2};
  background-color: ${colors.gray1};
  display: flex;
  flex-grow: 1;
`;

export const RenderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
  white-space: pre;
`;
