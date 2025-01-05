import { Markup } from 'telegraf';
import { additionalScenesButtons } from '../types/types';

const kbBtnCancel = Markup.inlineKeyboard([
  Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
]);

async function keyboardInlineTypeObject(btns) {
  const keyboard = btns.map((item: { name: string; type: string }) => {
    return [Markup.button.callback(item.name, item.type)];
  });
  keyboard.push([
    Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
  ]);
  return keyboard;
}

export { kbBtnCancel, keyboardInlineTypeObject };
