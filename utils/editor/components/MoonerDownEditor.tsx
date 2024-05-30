'use client';

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
import { Blocks } from '../data/Blocks';
import { any, key } from '../utils';

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
  const editorRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <textarea
      className="flex flex-1 p-[15px] resize-none text-bodyLarge rounded-xl border border-grayLight1 bg-grayLight2 dark:bg-grayDark2 dark:border-grayDark15"
      defaultValue={texts}
      ref={editorRef}
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
    />
  );
};

export default MoonerDownEditor;
