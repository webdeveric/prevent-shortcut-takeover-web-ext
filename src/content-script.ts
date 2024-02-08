import { PreventShortcutTakeover } from './PreventShortcutTakeover.js';

const pst = new PreventShortcutTakeover();

pst
  .setup()
  .load()
  .catch(error => console.error(error));
