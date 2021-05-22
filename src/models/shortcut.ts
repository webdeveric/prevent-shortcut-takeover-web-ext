export type Modifier = 'Alt' | 'Control' | 'Meta' | 'Shift';

export type Shortcut = {
  code: string;
  modifier: Modifier[];
  selector?: string;
};
