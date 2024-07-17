import { Context as ContextTelegraf } from 'telegraf';
import { mainEvents } from '../types/types';

/* export interface ISceneManagerHooks {
  enter?: (sceneId: string) => Promise<any>;
  leave?: () => void;
} */

export interface Context extends ContextTelegraf {
  session: {
    mainEvent?: mainEvents;
    substation_name_value: string;
    /* scenes: {
      activeSceneId: string;
    }; */
  };
}
/* export interface ISceneContext {
  scene: ISceneManagerHooks;
}
export type TBotContext = ISceneContext & Context;
 */
