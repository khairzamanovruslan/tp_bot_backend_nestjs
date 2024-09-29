import { Markup } from 'telegraf';
import { additionalScenesButtons } from '../types/types';

const kbBtnCancel = Markup.inlineKeyboard([
  Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
]);

export { kbBtnCancel };
