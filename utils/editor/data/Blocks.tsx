import { AlignType, BlockType } from './blockInterface';
import React from 'react';
import { key, noText } from '../utils';
import {
  BlockA,
  BlockAlign,
  BlockBold,
  BlockEditor,
  BlockStrikethrough,
  BlockUnderline,
  BlockUnderStrikethrough,
  BlockList,
  BlockNumbering,
  BlockQuotation,
} from './blockLayout';
import { EditorBlockReplacer } from './EditorBlockReplacer';
import { atomOneDark, CodeBlock } from 'react-code-blocks';
import { MoonerText } from '@/utils/editor/MoonerText';
import Image from 'next/image';

export class Blocks {
  static regex: { [p in BlockType]: RegExp } = {
    p: / /,
    h1: /^# (.*)/,
    h2: /^## (.*)/,
    h3: /^### (.*)/,
    h4: /^#### (.*)/,
    h5: /^##### (.*)/,
    h6: /^###### (.*)/,
    img: /^!\[([^\]]*)]\(([0-9a-zA-Z-_*.:?=&\/% ]*)\)/,
    shortCode: /`(.+)`/,
    code: /^```([a-z]*)/,
    youtube: / /,
    box: / /,
    url: /\[([^\]]*)]\(([0-9a-zA-Z-_*.:?=&\/% ]*)\)/g,
    style: /(\*\*\*|\*\*|\*|~~|__|_|`)(.+?)\1/g,
    align: /^([<>=])((?![<>=]).+?)\1$/,
    line: /^([-*_])\1{2,}$/,
    escape: /^([-*_])\1{2,}$/,
    quotation: /^> (.*)/,
    list: /^([*-]) (.*)/,
    numbering: /^(\d+)\. (.*)/,
    enchant: /\\([-_~`><=*])/g,
    unEnchant: /&:(\d)0.\d+:&/g,
    tab: /^(\^+)(.*)/,
  };

  static key: number = 0;

  static compile = (blocks: string): (React.ReactElement | undefined)[] => {
    Blocks.key = Math.random();
    const list: (React.ReactElement | undefined)[] = [];
    Blocks.quotation = [];
    Blocks.codeBlock = false;
    Blocks.codes = [];
    Blocks.codeLang = undefined;
    const strings = blocks.split(/\n/);
    for (let index = 0; index < strings.length; index++) {
      this.compileBlock(strings[index], index, list);
    }
    if (Blocks.codeBlock) {
      Blocks.addCodeBlock(list);
    }
    if (Blocks.quotation.length > 0) {
      list.push(
        <BlockQuotation key={key('quotation', Math.random())}>
          {Blocks.quotation}
        </BlockQuotation>
      );
    }
    return list;
  };

  private static addCodeBlock(list: (React.ReactElement | undefined)[]) {
    list.push(
      <CodeBlock
        customStyle={{
          overflowX: 'unset',
          fontFamily: 'Consolas',
        }}
        theme={atomOneDark}
        language={Blocks.codeLang}
        text={Blocks.codes.join('\n')}
      />
    );
    Blocks.codes = [];
    Blocks.codeBlock = false;
  }

  static quotation: (string | React.ReactElement)[] = [];
  static codeBlock: boolean = false;
  static codes: string[] = [];
  static codeLang: string | undefined = undefined;

  private static compileBlock(
    block: string,
    index: number,
    list: (React.ReactElement | undefined)[]
  ) {
    if (block.length < 0) return;
    let checks: RegExpExecArray | null;
    let align: AlignType = 'left';

    checks = Blocks.regex.code.exec(block);
    if (checks) {
      let [, language] = checks;
      if (Blocks.codeBlock) {
        // Blocks.codes.push(block);
        Blocks.addCodeBlock(list);
        return;
      }
      Blocks.codeLang = language;
      Blocks.codeBlock = true;
      return;
    }

    if (Blocks.codeBlock) {
      console.log(`code: ${block}`);
      Blocks.codes.push(block);
      return;
    }

    checks = Blocks.regex.quotation.exec(block);
    if (checks) {
      let [, text] = checks;
      if (!text) text = '';
      Blocks.quotation.push(
        <Blocks.P key={key('blc', index)} id={key('block', index)}>
          {text.length <= 0 ? noText() : this.styleCheck(text, false)}
        </Blocks.P>
      );
      return;
    }
    if (Blocks.quotation.length > 0) {
      list.push(
        <BlockQuotation key={key('quotation', index)}>
          {Blocks.quotation}
        </BlockQuotation>
      );
      Blocks.quotation = [];
    }

    if (Blocks.regex.line.test(block)) {
      list.push(
        <div
          className="w-full min-h-[2px] h-[2px] rounded-sm bg-grayLight1 dark:bg-grayDark2 my-2"
          key={key('line', index)}
          id={key('block', index)}
        />
      );
      return;
    }

    checks = Blocks.regex.align.exec(block);
    if (checks) {
      const [, type, text] = checks;
      align = type == '>' ? 'right' : type == '=' ? 'center' : 'left';
      block = text;
    }

    checks = Blocks.regex.h6.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H6>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H6>
        </BlockAlign>
      );
      return;
    }

    checks = Blocks.regex.h5.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H5>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H5>
        </BlockAlign>
      );
      return;
    }

    checks = Blocks.regex.h4.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H4>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H4>
        </BlockAlign>
      );
      return;
    }
    checks = Blocks.regex.h3.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H3>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H3>
        </BlockAlign>
      );
      return;
    }
    checks = Blocks.regex.h2.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H2>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H2>
        </BlockAlign>
      );
      return;
    }
    checks = Blocks.regex.h1.exec(block);
    if (checks) {
      const [, text] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.H1>
            {text.length <= 0 ? noText() : this.styleCheck(text, true)}
          </Blocks.H1>
        </BlockAlign>
      );
      return;
    }

    checks = Blocks.regex.img.exec(block);
    if (checks) {
      const [, alt, url] = checks;
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
        >
          <Blocks.Img url={url} alt={alt} />
        </BlockAlign>
      );
      return;
    }

    let tabs: number = 0;

    checks = Blocks.regex.tab.exec(block);
    if (checks) {
      const [, tab, text] = checks;
      tabs = Math.min(tab.length, 16);
      block = text ?? '';
    }

    checks = Blocks.regex.list.exec(block);
    if (checks) {
      let [, , text] = checks;
      if (!text) text = '';
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
          $tab={`${tabs * 24}px`}
        >
          <BlockList />
          <Blocks.P>
            {text.length <= 0 ? noText() : this.styleCheck(text, false)}
          </Blocks.P>
        </BlockAlign>
      );
      return;
    }

    checks = Blocks.regex.numbering.exec(block);
    if (checks) {
      let [, number, text] = checks;
      if (!text) text = '';
      list.push(
        <BlockAlign
          key={key(align, index)}
          id={key('block', index)}
          $align={align}
          $tab={`${tabs * 24}px`}
        >
          <BlockNumbering>
            <Blocks.P>{number}.</Blocks.P>
          </BlockNumbering>
          <Blocks.P>
            {text.length <= 0 ? noText() : this.styleCheck(text, false)}
          </Blocks.P>
        </BlockAlign>
      );
      return;
    }

    list.push(
      <BlockAlign
        key={key(align, index)}
        id={key('block', index)}
        $align={align}
        $tab={`${tabs * 24}px`}
      >
        <Blocks.P>
          {block.length <= 0 ? noText() : this.styleCheck(block)}
        </Blocks.P>
      </BlockAlign>
    );
  }

  private static styleCheck = (
    blocks: string,
    noStyle: boolean = false
  ): (string | React.ReactElement)[] => {
    if (noStyle) return [blocks];
    return this.chk(blocks).flatMap((block) => {
      if (typeof block == 'string') {
        const blockArr: (string | React.ReactElement)[] = [];
        const check = block.matchAll(Blocks.regex.url);
        //@ts-ignore
        for (let regExpMatchArray of check) {
          const [target, alt, url] = regExpMatchArray;
          const idx = block.indexOf(target);
          if (idx != 0) {
            blockArr.push(block.substring(0, idx));
            block = block.substring(idx);
          }
          block = block.substring(target.length);
          blockArr.push(
            <BlockA href={url} target={'_blank'}>
              {alt}
            </BlockA>
          );
        }
        if (block.length > 0) blockArr.push(block);
        return blockArr;
      } else {
        return block;
      }
    });
  };

  private static enchantIndex = ['*', '-', '_', '~', '`', '<', '>', '='];

  private static unEnchant(block: string) {
    if (Blocks.regex.unEnchant.test(block)) {
      // console.log(`unEnchanted: ${block}`)
      return block
        .replaceAll(`&:1${Blocks.key}:&`, `*`)
        .replaceAll(`&:2${Blocks.key}:&`, `-`)
        .replaceAll(`&:3${Blocks.key}:&`, '_')
        .replaceAll(`&:4${Blocks.key}:&`, '~')
        .replaceAll(`&:5${Blocks.key}:&`, '`')
        .replaceAll(`&:6${Blocks.key}:&`, '<')
        .replaceAll(`&:7${Blocks.key}:&`, '>')
        .replaceAll(`&:8${Blocks.key}:&`, '=');
    }
    return block;
  }

  private static chk = (
    block: string,
    bold: boolean = false,
    italic: boolean = false,
    underline: boolean = false,
    strike: boolean = false
  ): (string | React.ReactElement)[] => {
    const arr: (string | React.ReactElement)[] = [];
    if (Blocks.regex.enchant.test(block)) {
      block = block
        .replaceAll(/\\\*/g, `&:1${Blocks.key}:&`)
        .replaceAll(/\\-/g, `&:2${Blocks.key}:&`)
        .replaceAll(/\\_/g, `&:3${Blocks.key}:&`)
        .replaceAll(/\\~/g, `&:4${Blocks.key}:&`)
        .replaceAll(/\\`/g, `&:5${Blocks.key}:&`)
        .replaceAll(/\\</g, `&:6${Blocks.key}:&`)
        .replaceAll(/\\>/g, `&:7${Blocks.key}:&`)
        .replaceAll(/\\=/g, `&:8${Blocks.key}:&`);
    }
    //@ts-ignore
    const check = [...block.matchAll(Blocks.regex.style)];
    for (let regExpMatchArray of check) {
      const [target, tag, str] = regExpMatchArray;
      const idx = block.indexOf(target);
      if (idx != 0) {
        arr.push(this.unEnchant(block.substring(0, idx)));
        block = block.substring(idx);
      }
      block = block.substring(target.length);
      if (tag === '`') {
        arr.push(
          <span
            className="bg-grayLight2 dark:bg-grayDark2 text-blue-500 text-bodyStrong p-[1px_4px] rounded-[4px]"
            key={Math.random()}
          >
            {str}
          </span>
        );
      } else if (tag === '*' || tag === '_') {
        const checked = this.chk(str, bold, true, underline, strike);
        if (italic) arr.push(...checked);
        else
          arr.push(
            <span className="italic" key={Math.random()}>
              {checked}
            </span>
          );
      } else if (tag === '**') {
        const checked = this.chk(str, true, italic, underline, strike);
        if (bold) arr.push(...checked);
        else
          arr.push(
            <span className="font-bold" key={Math.random()}>
              {checked}
            </span>
          );
      } else if (tag === '***') {
        const checked = this.chk(str, true, true, underline, strike);
        if (bold) arr.push(...checked);
        else
          arr.push(
            <span className="font-bold" key={Math.random()}>
              <span className="italic">{checked}</span>
            </span>
          );
      } else if (tag === '__') {
        const checked = this.chk(str, bold, italic, true, strike);
        if ((underline && strike) || underline) arr.push(...checked);
        else if (strike)
          arr.push(
            <BlockUnderStrikethrough key={Math.random()}>
              {checked}
            </BlockUnderStrikethrough>
          );
        else
          arr.push(
            <BlockUnderline key={Math.random()}>{checked}</BlockUnderline>
          );
      } else if (tag === '~~') {
        const checked = this.chk(str, bold, italic, underline, true);
        if ((underline && strike) || strike) arr.push(...checked);
        else if (underline)
          arr.push(
            <BlockUnderStrikethrough key={Math.random()}>
              {checked}
            </BlockUnderStrikethrough>
          );
        else
          arr.push(
            <BlockStrikethrough key={Math.random()}>
              {checked}
            </BlockStrikethrough>
          );
      }
    }
    if (block.length > 0) arr.push(this.unEnchant(block));
    return arr;
  };

  static compileEditor = (blocks: string[]) =>
    blocks.map((v, index) => this.compileBlockEditor(v, index));

  private static compileBlockEditor(block: string, index: number) {
    if (block.length < 0) return undefined;
    let checks: RegExpExecArray | null;
    checks = Blocks.regex.img.exec(block);
    if (checks) {
      const [target, alt, url] = checks;
      return (
        <BlockEditor>
          {new EditorBlockReplacer(target)
            .replace(alt, 'blue4')
            .replace(url, 'blue6')
            .build()}
        </BlockEditor>
      );
    }

    checks = Blocks.regex.h4.exec(block);
    if (checks) {
      const [target, str] = checks;
      return (
        <BlockEditor>
          <BlockBold>
            {new EditorBlockReplacer(target).replace(str, 'gray9').build()}
          </BlockBold>
        </BlockEditor>
      );
      // return <Blocks.H4 key={key('blc', index)}>{this.styleCheckEditor(str, true)}</Blocks.H4>
    }
    checks = Blocks.regex.h3.exec(block);
    if (checks) {
      const [target, str] = checks;
      return (
        <BlockEditor>
          <BlockBold>
            {new EditorBlockReplacer(target).replace(str, 'gray9').build()}
          </BlockBold>
        </BlockEditor>
      );
    }
    checks = Blocks.regex.h2.exec(block);
    if (checks) {
      const [target, str] = checks;
      return (
        <BlockEditor>
          <BlockBold>
            {new EditorBlockReplacer(target).replace(str, 'gray9').build()}
          </BlockBold>
        </BlockEditor>
      );
    }
    checks = Blocks.regex.h1.exec(block);
    if (checks) {
      const [target, str] = checks;
      return (
        <MoonerText typography={'H1'}>
          <BlockBold>
            {new EditorBlockReplacer(target).replace(str, 'gray9').build()}
          </BlockBold>
        </MoonerText>
      );
    }
    return (
      <BlockEditor key={key('blc', index)}>
        {this.styleCheckEditor(block)}
      </BlockEditor>
    );
  }

  private static styleCheckEditor = (
    blocks: string,
    noStyle: boolean = false
  ): (string | React.ReactElement)[] => {
    return (noStyle ? [blocks] : this.chk(blocks)).flatMap((block) => {
      if (typeof block == 'string') {
        const blockArr: (string | React.ReactElement)[] = [];
        const check = block.matchAll(Blocks.regex.url);
        //@ts-ignore
        for (let regExpMatchArray of check) {
          const [target, alt, url] = regExpMatchArray;
          const idx = block.indexOf(target);
          if (idx != 0) {
            blockArr.push(block.substring(0, idx));
            block = block.substring(idx);
          }
          block = block.substring(target.length);
          blockArr.push(<BlockA target={'_blank'}>{alt}</BlockA>);
        }
        if (block.length > 0) blockArr.push(block);
        return blockArr;
      } else {
        return block;
      }
    });
  };

  static P = ({ ...props }) => (
    <span
      className="text-bodyLarge text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static H1 = ({ ...props }) => (
    <span
      className="-mb-4 text-titleLarge2 text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );
  static H2 = ({ ...props }) => (
    <span
      className="mt-3 text-titleLarge text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static H3 = ({ ...props }) => (
    <span
      className="mt-2 text-title text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static H4 = ({ ...props }) => (
    <span
      className="mt-2 text-subtitle text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static H5 = ({ ...props }) => (
    <span
      className="mt-2 text-bodyLarge2 text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static H6 = ({ ...props }) => (
    <span
      className="mt-2 text-bodyStrong text-grayDark3 dark:text-grayLight2"
      {...props}
    />
  );

  static Img = ({ url, alt }: { url: string; alt?: string }) => {
    return (
      <Image
        src={url}
        alt={alt || ''}
        width={600}
        height={600}
        className={`cursor-pointer w-[90%] h-[80%] object-contain sm:w-[80%] sm:h-[70%] rounded-2xl mb-2`}
        priority
      />
    );
  };
}
