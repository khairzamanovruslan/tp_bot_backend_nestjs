import { SceneContext } from 'telegraf/typings/scenes';
import { Context } from '../context/context.interface';

export class Logs {
  command(ctx: Context | SceneContext, id_tg: string, command: string) {
    const text = `+++\nUser id: ${id_tg}\nКоманда: ${command}\n+++`;
    return ctx.telegram.sendMessage(process.env.ID_ADMIN_TG, text);
  }

  message(ctx: Context | SceneContext, id_tg: string, message: string) {
    const text = `+++\nUser id: ${id_tg}\nСообщение: ${message}\n+++`;
    return ctx.telegram.sendMessage(process.env.ID_ADMIN_TG, text);
  }
}
