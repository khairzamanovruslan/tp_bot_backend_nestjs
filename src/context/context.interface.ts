import { Context as ContextTelegraf } from 'telegraf';
import { mainEvents } from '../types/types';

/* export interface ISceneManagerHooks {
  enter?: (sceneId: string) => Promise<any>;
  leave?: () => void;
} */

export interface Context extends ContextTelegraf {
  session: {
    mainEvent?: mainEvents;
    device_name_value: string;
    device_latitude_value: string;
    device_longitude_value: string;
    device_type_object_id: number | null;
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
