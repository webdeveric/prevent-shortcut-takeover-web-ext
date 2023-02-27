import { PreventShortcutTakeover } from './PreventShortcutTakeover';

const pst = new PreventShortcutTakeover();

pst
  .setup()
  .load()
  .catch(error => console.error(error));
