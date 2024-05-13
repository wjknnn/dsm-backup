export type BlockType =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'img'
  | 'shortCode'
  | 'code'
  | 'youtube'
  | 'box'
  | 'url'
  | 'style'
  | 'align'
  | 'line'
  | 'escape'
  | 'quotation'
  | 'list'
  | 'numbering'
  | 'enchant'
  | 'unEnchant'
  | 'tab';

export type AlignType = 'right' | 'left' | 'center';

export interface BlockStyle {}
