'use client';

import styled from 'styled-components';
import { Icon } from './Icon';
import { Txt } from './Txt';
import { Regex } from '../regex';
import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  ClipboardEvent,
  SetStateAction,
  useRef,
  useState,
  RefObject,
} from 'react';
import { AlignType } from '../data/blockInterface';
import { Blocks } from '../data/Blocks';
import { motions } from '../motions';
import { all, any, key } from '../utils';
import { colors } from './colors';
import { MDTextArea } from '@/utils/editor/Style';

interface UndoData {
  str: string;
  start: number;
  end: number;
}

interface Props {
  texts: string;
  setTexts: Dispatch<SetStateAction<string>>;
  renders: RefObject<HTMLElement>;
  placeholder?: string;
}

const MoonerDownEditor = ({ texts, setTexts, renders, placeholder }: Props) => {
  const [undo, setUndo] = useState<UndoData[]>([]);
  const [undoIndex, setUndoIndex] = useState<number>(0);
  const [context, setContext] = useState<{ x: number; y: number } | undefined>(
    undefined
  );
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const isRangeSelected = (
    element: HTMLTextAreaElement | undefined = undefined
  ) => {
    if (element) {
      setTexts(element.value);
    } else {
      const edit = editorRef.current;
      if (!edit) return false;
      return edit.selectionStart != edit.selectionEnd;
    }
  };

  const autoComplete = (str: string, rangeOnly: boolean = false): boolean => {
    const edit = editorRef.current;
    if (!edit) return false;
    const startPos = edit.selectionStart;
    const endPos = edit.selectionEnd;
    if (endPos == startPos) {
      if (rangeOnly) return false;
      edit.value =
        edit.value.substring(0, startPos) +
        str.replaceAll('$', '') +
        edit.value.substring(startPos);
      edit.setSelectionRange(
        startPos + str.indexOf('$'),
        startPos + str.indexOf('$')
      );
      edit.focus();
      updateText(edit);
      registerUndo();
      return true;
    } else {
      edit.value =
        edit.value.substring(0, startPos) +
        str.replaceAll('$', edit.value.substring(startPos, endPos)) +
        edit.value.substring(endPos);
      edit.setSelectionRange(
        startPos + str.indexOf('$'),
        endPos + str.indexOf('$')
      );
      edit.focus();
      updateText(edit);
      registerUndo();
      return true;
    }
  };

  const betweenRemove = (start: string, end: string): boolean => {
    const edit = editorRef.current;
    if (edit) {
      const pos = edit.selectionStart;
      if (
        edit.value.substring(pos - start.length, pos) === start &&
        edit.value.substring(pos, pos + end.length) === end
      ) {
        edit.value =
          edit.value.substring(0, pos - start.length) +
          edit.value.substring(pos + end.length);
        edit.setSelectionRange(pos - start.length, pos - start.length);
        edit.focus();
        updateText(edit);
        registerUndo();
        return true;
      }
    }
    return false;
  };

  const registerUndo = () => {
    const edit = editorRef.current;
    if (!edit) return;
    if (undo.length <= 0 || undo[undo.length - 1].str !== edit.value) {
      setUndo((v) => {
        for (let i = undoIndex; i < 0; i++) v.pop();
        v.push({
          str: edit.value,
          start: edit.selectionStart,
          end: edit.selectionEnd,
        });
        // console.log(`Undo Added: ${edit.value}`);
        if (v.length > 100) v = v.slice(v.length - 100);
        return v;
      });
      setUndoIndex(0);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const edit = event.currentTarget;
    // console.log(`${event.code}`);
    let start = edit.selectionStart;
    let end = edit.selectionEnd;
    switch (event.code) {
      case 'Enter':
        event.preventDefault();
        let first = Math.max(edit.value.lastIndexOf('\n', start - 1) + 1, 0);
        let last = edit.value.indexOf('\n', start);
        if (last < 0) last = edit.value.length;
        let text = edit.value.substring(first, last);
        let executed = false;

        let checks: RegExpExecArray | null;
        checks = Blocks.regex.tab.exec(text);
        if (checks) {
          const [, tab, s] = checks;
          text = s;
          if (!s) {
            edit.value =
              edit.value.substring(0, first) + edit.value.substring(end);
            edit.setSelectionRange(first, first);
            updateText(edit);
            registerUndo();
          } else if (!event.nativeEvent.isComposing) {
            edit.value =
              edit.value.substring(0, start) +
              `\n${tab}` +
              edit.value.substring(end);
            edit.setSelectionRange(
              start + 1 + tab.length,
              end + 1 + tab.length
            );
            start += 1 + tab.length;
            end += 1 + tab.length;
            updateText(edit);
            registerUndo();
          }
          executed = true;
        }
        checks = Blocks.regex.list.exec(text);
        if (checks) {
          const [, tag, text] = checks;
          if (!text) {
            edit.value =
              edit.value.substring(0, first) + edit.value.substring(end);
            edit.setSelectionRange(first, first);
            updateText(edit);
            registerUndo();
          } else if (!event.nativeEvent.isComposing) {
            edit.value =
              edit.value.substring(0, start) +
              (executed ? `${tag} ` : `\n${tag} `) +
              edit.value.substring(end);
            edit.setSelectionRange(
              start + (executed ? 2 : 3),
              start + (executed ? 2 : 3)
            );
            start += executed ? 2 : 3;
            end += executed ? 2 : 3;
            updateText(edit);
            registerUndo();
          }
          return;
        }
        checks = Blocks.regex.numbering.exec(text);
        if (checks) {
          const [, number, text] = checks;
          if (!text) {
            edit.value =
              edit.value.substring(0, first) + edit.value.substring(end);
            edit.setSelectionRange(first, first);
            updateText(edit);
            registerUndo();
          } else if (!event.nativeEvent.isComposing) {
            edit.value =
              edit.value.substring(0, start) +
              (executed ? `${+number + 1}. ` : `\n${+number + 1}. `) +
              edit.value.substring(end);
            edit.setSelectionRange(
              start + `${+number + 1}`.length + (executed ? 2 : 3),
              start + `${+number + 1}`.length + (executed ? 2 : 3)
            );
            updateText(edit);
            registerUndo();
          }
          return;
        }
        checks = Blocks.regex.quotation.exec(text);
        if (checks) {
          const [, text] = checks;
          if (!text) {
            edit.value =
              edit.value.substring(0, first) + edit.value.substring(end);
            edit.setSelectionRange(first, first);
            updateText(edit);
            registerUndo();
          } else if (!event.nativeEvent.isComposing) {
            edit.value =
              edit.value.substring(0, start) +
              (executed ? `> ` : `\n> `) +
              edit.value.substring(end);
            edit.setSelectionRange(
              start + (executed ? 2 : 3),
              start + (executed ? 2 : 3)
            );
            updateText(edit);
            registerUndo();
          }
          return;
        }
        if (!executed && !event.nativeEvent.isComposing) {
          edit.value =
            edit.value.substring(0, start) + `\n` + edit.value.substring(end);
          edit.setSelectionRange(start + 1, start + 1);
          updateText(edit);
          registerUndo();
        }
        return;
      case 'Backspace':
        if (start != end) return;
        if (
          any(
            [
              betweenRemove('<', '>'),
              betweenRemove('[', ']'),
              betweenRemove('{', '}'),
              betweenRemove('(', ')'),
              betweenRemove("'", "'"),
              betweenRemove('"', '"'),
            ],
            (v) => v
          )
        ) {
          event.preventDefault();
          return;
        }
        let first3 = Math.max(
          edit.value.lastIndexOf('\n', edit.selectionStart - 1) + 1,
          0
        );
        const codesCount = edit.value
          .substring(0, first3)
          .split(/\n/)
          .filter((v) => Blocks.regex.code.test(v)).length;
        if (codesCount % 2 != 0) {
          if (edit.value.endsWith('    ', start)) {
            event.preventDefault();
            edit.value =
              edit.value.substring(0, start - 4) + edit.value.substring(start);
            edit.setSelectionRange(start - 4, end - 4);
            updateText(edit);
            registerUndo();
          }
        }
        registerUndo();
        return;
      case 'Comma':
        if (!event.shiftKey) break;
        event.preventDefault();
        autoComplete(`<$>`);
        return;
      case 'Digit9':
        if (!event.shiftKey) break;
        event.preventDefault();
        autoComplete(`($)`);
        return;
      case 'Digit8':
        if (!event.shiftKey) break;
        if (autoComplete(`*$*`, true)) event.preventDefault();
        registerUndo();
        return;
      case 'NumpadMultiply':
        if (autoComplete(`*$*`, true)) event.preventDefault();
        registerUndo();
        return;
      case 'Backquote':
        if (autoComplete(event.shiftKey ? `~$~` : '`$`', true)) {
          event.preventDefault();
        }
        registerUndo();
        return;
      case 'BracketLeft':
        event.preventDefault();
        autoComplete(event.shiftKey ? `{$}` : `[$]`);
        registerUndo();
        return;
      case 'Quote':
        event.preventDefault();
        autoComplete(event.shiftKey ? `"$"` : `'$'`);
        registerUndo();
        return;
      case 'KeyS':
        if (event.ctrlKey) {
          event.preventDefault();
          // localStorage.setItem('editor', texts)
        }
        return;
      case 'Tab':
        event.preventDefault();
        let first2 = Math.max(edit.value.lastIndexOf('\n', start - 1) + 1, 0);
        const codes = edit.value
          .substring(0, first2)
          .split(/\n/)
          .filter((v) => Blocks.regex.code.test(v)).length;
        if (codes % 2 == 0) {
          if (event.shiftKey) {
            if (edit.value.endsWith('^', first2 + 1)) {
              edit.value =
                edit.value.substring(0, first2) +
                edit.value.substring(first2 + 1);
              edit.setSelectionRange(start - 1, end - 1);
              updateText(edit);
              registerUndo();
            }
            return;
          } else {
            edit.value =
              edit.value.substring(0, first2) +
              '^' +
              edit.value.substring(first2);
            edit.setSelectionRange(start + 1, end + 1);
          }
        } else {
          if (event.shiftKey) {
            if (edit.value.endsWith('    ', first2 + 4)) {
              edit.value =
                edit.value.substring(0, first2) +
                edit.value.substring(first2 + 4);
              edit.setSelectionRange(start - 4, end - 4);
              updateText(edit);
              registerUndo();
            }
            return;
          } else {
            if (start == end) {
              edit.value =
                edit.value.substring(0, start) +
                '    ' +
                edit.value.substring(start);
              edit.setSelectionRange(start + 4, end + 4);
            } else {
              let append = 0;
              let last2 = edit.value.indexOf('\n', end);
              if (last2 < 0) last2 = edit.value.length;
              edit.value =
                edit.value.substring(0, first2) +
                edit.value
                  .substring(first2, last2)
                  .split(/\n/)
                  .map((v) => {
                    append += 4;
                    return '    ' + v;
                  })
                  .join('\n') +
                edit.value.substring(last2);
              edit.setSelectionRange(start + append, end + append);
            }
          }
        }
        updateText(edit);
        registerUndo();
        return;
    }
    if (event.ctrlKey) {
      if ((event.shiftKey && event.code == 'KeyZ') || event.code == 'KeyY') {
        event.preventDefault();
        if (undoIndex < 0) {
          const data = undo[undo.length + undoIndex];
          edit.value = data.str;
          edit.setSelectionRange(data.start, data.end);
          setUndoIndex((v) => v + 1);
          updateText(edit);
        }
        return;
      } else if (event.code == 'KeyZ') {
        event.preventDefault();
        if (undo.length + undoIndex > 0) {
          const data = undo[undo.length - 1 + undoIndex];
          edit.value = data.str;
          edit.setSelectionRange(data.start, data.end);
          setUndoIndex((v) => v - 1);
          updateText(edit);
        }
        return;
      }
    }
    if (Regex.keys.includes(event.code)) {
      registerUndo();
    } else if (!event.nativeEvent.isComposing) {
      if (Regex.inputKey.test(event.code)) {
        registerUndo();
      }
    }
    if (event.isDefaultPrevented()) updateText(edit);
  };

  const onInput = (event: FormEvent<HTMLTextAreaElement>) => {
    // registerUndo();
    updateText(event.currentTarget);
    blockFocus(event.currentTarget);
  };

  const onPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.selectionStart != event.currentTarget.selectionEnd)
      return;
    const data = event.clipboardData.getData('text/plain');
    if (
      Regex.url.test(data) &&
      event.currentTarget.value.substring(
        event.currentTarget.selectionStart - 1,
        event.currentTarget.selectionEnd + 1
      ) !== '()'
    ) {
      event.preventDefault();
      autoComplete(`[$](${data})`);
      registerUndo();
    }
  };

  const updateText = (element: HTMLTextAreaElement | undefined = undefined) => {
    if (element) {
      if (element.value != texts) {
        setTexts(element.value);
      }
    } else {
      const edit = editorRef.current;
      if (!edit) return false;
      if (edit.value != texts) {
        setTexts(edit.value);
      }
    }
  };

  const blockFocus = (textArea: HTMLTextAreaElement) => {
    setTimeout(() => {
      const index =
        textArea.value.substring(0, textArea.selectionStart).split(/\n/)
          .length - 1;
      const element = document.getElementById(key('block', index));
      const firstElement =
        document.getElementById(key('block', 0))?.offsetTop ?? 0;
      if (element) {
        // console.log(
        // 	`${index}, ${firstElement}, ${element.offsetTop}, ${element.offsetHeight}, ${firstElement - element.offsetTop}, ${renders.current.offsetHeight / 2}`
        // )
        // console.log(element.innerHTML)
        renders.current?.scrollTo({
          left: 0,
          top:
            element.offsetTop -
            firstElement +
            element.offsetHeight / 2 -
            renders.current.offsetHeight / 2,
          behavior: 'smooth',
        });
      }
    }, 20);
  };

  const setAlign = (align: AlignType) => {
    const edit = editorRef.current;
    if (!edit) return false;
    edit.focus();

    const start = edit.selectionStart;
    const end = edit.selectionEnd;
    let firstEnter = edit.value.lastIndexOf('\n', start - 1) + 1;
    let lastEnter = edit.value.indexOf('\n', end);
    if (firstEnter < 0) firstEnter = 0;
    if (lastEnter < 0) lastEnter = edit.value.length;
    let append = 0;
    const alignedText = edit.value
      .substring(firstEnter, lastEnter)
      .split(/\n/)
      .map((block) => {
        if (block.length <= 0 || Blocks.regex.quotation.test(block))
          return block;
        const checks = Blocks.regex.align.exec(block);
        if (checks) {
          const [, , text] = checks;
          switch (align) {
            case 'right':
              return `>${text}>`;
            case 'left':
              append -= 2;
              return text;
            case 'center':
              return `=${text}=`;
          }
        } else {
          switch (align) {
            case 'right':
              append += 2;
              return `>${block}>`;
            case 'left':
              return block;
            case 'center':
              append += 2;
              return `=${block}=`;
          }
        }
      });
    edit.value =
      edit.value.substring(0, firstEnter) +
      alignedText.join('\n') +
      edit.value.substring(lastEnter);
    edit.setSelectionRange(firstEnter, end + append);
    updateText(edit);
    registerUndo();
  };

  const setStyle = (
    bold: boolean = false,
    italic: boolean = false,
    underline: boolean = false,
    strikethrough: boolean = false
  ) => {
    const edit = editorRef.current;
    if (!edit) return false;
    edit.focus();

    let start = edit.selectionStart;
    let end = edit.selectionEnd;
    const select = edit.value.substring(start, end);
    const split = select.split(/\n/);

    const modify = (tags: string[]) => {
      let firstTag = split[0];
      let lastTag = split[split.length - 1];

      const tag = tags[0];
      const length = tag.length;
      if (any(tags, (t) => firstTag.startsWith(t))) start += length;
      if (any(tags, (t) => lastTag.endsWith(t))) end -= length;

      const first = edit.value.substring(start - length, start);
      const last = edit.value.substring(end, end + length);

      const isAppend = all(tags, (t) => first != t || last != t);

      if (!isAppend) {
        if (any(tags, (t) => firstTag.startsWith(t)))
          firstTag = firstTag.substring(length, firstTag.length);
        if (any(tags, (t) => firstTag.endsWith(t)))
          firstTag = firstTag.substring(0, firstTag.length - length);

        if (any(tags, (t) => lastTag.startsWith(t)))
          lastTag = lastTag.substring(length, lastTag.length);
        if (any(tags, (t) => lastTag.endsWith(t)))
          lastTag = lastTag.substring(0, lastTag.length - length);
      }

      let append = 0;
      const text = [
        firstTag + (isAppend ? tag : ''),
        ...split.slice(1, split.length - 1).map((value) => {
          if (value.length <= 0) return value;
          for (let t of tags) {
            if (value.startsWith(t) && value.endsWith(t)) {
              append -= length * 2;
              return value.substring(length, value.length - length);
            }
          }
          append += length * 2;
          return `${tag}${value}${tag}`;
        }),
        (isAppend ? tag : '') + lastTag,
      ];

      if (isAppend) {
        edit.value =
          edit.value.substring(0, start) +
          tag +
          text.join('\n') +
          tag +
          edit.value.substring(end);
        edit.setSelectionRange(start + length, end + length * 3 + append);
      } else {
        edit.value =
          edit.value.substring(0, start - length) +
          text.join('\n') +
          edit.value.substring(end + length);
        edit.setSelectionRange(start - length, end - length * 3 + append);
      }
    };

    const modifySingle = (tags: string[]) => {
      const tag = tags[0];
      const length = tag.length;
      const first = edit.value.substring(start - length, start);
      const last = edit.value.substring(end, end + length);
      if (any(tags, (t) => first == t && last == t)) {
        edit.value =
          edit.value.substring(0, start - length) +
          select +
          edit.value.substring(end + length);
        edit.setSelectionRange(start - length, end - length);
      } else {
        edit.value =
          edit.value.substring(0, start) +
          tag +
          select +
          tag +
          edit.value.substring(end);
        edit.setSelectionRange(start + length, end + length);
      }
    };

    if (italic) {
      if (split.length > 1) {
        modify(['_', '*']);
      } else {
        modifySingle(['_', '*']);
      }
    }

    if (bold) {
      if (split.length > 1) {
        modify(['**']);
      } else {
        modifySingle(['**']);
      }
    }

    if (underline) {
      if (split.length > 1) {
        modify(['__']);
      } else {
        modifySingle(['__']);
      }
    }

    if (strikethrough) {
      if (split.length > 1) {
        modify(['~~']);
      } else {
        modifySingle(['~~']);
      }
    }
    updateText(edit);
    registerUndo();
  };

  return (
    <>
      {context && (
        <Context
          delay={0}
          duration={0.35}
          $left={`${context.x}px`}
          $top={`${context.y}px`}
        >
          {isRangeSelected() && (
            <IconContext>
              <IconBody onClick={() => setStyle(true)}>
                <StyleText $bold>B</StyleText>
              </IconBody>
              <IconBody onClick={() => setStyle(false, true)}>
                <StyleText $italic>B</StyleText>
              </IconBody>
              <IconBody onClick={() => setStyle(false, false, true)}>
                <StyleText $under>B</StyleText>
              </IconBody>
              <IconBody onClick={() => setStyle(false, false, false, true)}>
                <StyleText $strike>B</StyleText>
              </IconBody>
            </IconContext>
          )}
          <IconContext>
            <IconBody onClick={() => setAlign('left')}>
              <Icon name={'alignLeft'} size={24} />
            </IconBody>
            <IconBody onClick={() => setAlign('center')}>
              <Icon name={'alignCenter'} size={24} />
            </IconBody>
            <IconBody onClick={() => setAlign('right')}>
              <Icon name={'alignRight'} size={24} />
            </IconBody>
          </IconContext>
          <InnerContext>
            <Txt onClick={() => autoComplete('[]($)')}>링크 삽입</Txt>
          </InnerContext>
          <InnerContext>
            <Txt onClick={() => autoComplete('![]($)')}>이미지 삽입</Txt>
          </InnerContext>
        </Context>
      )}
      <MDTextArea
        defaultValue={texts}
        ref={editorRef}
        onClick={() => setContext(undefined)}
        onMouseDown={(event: any) => {
          if (event.button == 2) event.preventDefault();
          else if (event.button == 0) {
            blockFocus(event.currentTarget);
          }
        }}
        onPaste={onPaste}
        onInput={onInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onContextMenu={(event: any) => {
          event.preventDefault();
          setContext({ x: event.pageX + 6, y: event.pageY + 6 });
        }}
      />
    </>
  );
};

const StyleText = styled.span<{
  $bold?: boolean;
  $under?: boolean;
  $strike?: boolean;
  $italic?: boolean;
}>`
  font-family: Pretendard, Prontandard, sans-serif;
  font-size: 18px;
  color: white;
  font-weight: ${(props) => (props.$bold ? '900' : '400')};
  text-decoration-line: ${(props) =>
    props.$strike ? 'line-through' : props.$under ? 'underline' : 'none'};
  font-style: ${(props) => (props.$italic ? 'italic' : 'unset')};
  margin-right: ${(props) => (props.$italic ? '2px' : '0')};
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

const IconBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 30px;
  background-color: ${colors.gray8};
  transition: background-color 0.1s;

  &:hover {
    background-color: ${colors.gray6};
  }
`;

const IconContext = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 3px 0;
`;

const InnerContext = styled.div`
  margin: 0 10px;
  padding: 8px 6px;
  transition: background-color 0.1s;
  border-radius: 5px;

  &:hover {
    background-color: ${colors.gray8};
  }
`;

const Context = styled(motions.fadeDiv)<{ $top: string; $left: string }>`
  position: fixed;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  padding: 10px 0;
  display: flex;
  width: 200px;
  height: auto;
  gap: 6px;
  border-radius: 8px;
  background-color: ${colors.gray9};
  transition: all 0.25s;
  flex-direction: column;
`;

export default MoonerDownEditor;
