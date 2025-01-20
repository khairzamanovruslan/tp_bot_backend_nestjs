import { Markup } from 'telegraf';
import { additionalScenesButtons } from '../types/types';

const kbBtnCancel = Markup.inlineKeyboard([
  Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
]);

async function dynamicKeyboardInlineTypeObject(btns) {
  const keyboard = btns.map((item: { name: string; id: number }) => {
    return [Markup.button.callback(item.name, `typeobjectid-${item.id}`)];
  });
  keyboard.push([
    Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
  ]);
  return keyboard;
}

async function dynamicKeyboardInlineDevicesPC(btns) {
  const keyboard = btns.map((item: { name: string; id: number }) => {
    return [Markup.button.callback(item.name, `devicepsid-${item.id}`)];
  });
  keyboard.push([
    Markup.button.callback('Отмена', additionalScenesButtons.btnCancel),
  ]);
  return keyboard;
}

export {
  kbBtnCancel,
  dynamicKeyboardInlineTypeObject,
  dynamicKeyboardInlineDevicesPC,
};
