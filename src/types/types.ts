export enum mainEvents {
  DEVICES_SEARCH = 'devices-search',
  DEVICE_NAME = 'device_name',
  DEVICE_COORDINATES = 'device_coordinates',
  DEVICE_TYPE_OBJECT = 'device_type_object',
}

export enum mainCommands {
  DEVICES_REPORT = 'report',
  DEVICE_ADD = 'add_device',
  DEVICE_DELETE = 'delete_device',
  DEVICE_UPDATE = 'update_device',
  USERS_TG_REPORT = 'report_users',
  USER_TG_ADD = 'add_user',
  USER_TG_DELETE = 'delete_user',
  USER_TG_ACCESS = 'report_users_access',
  NOTIFICATIONS_USERS_TG_ALL = 'notifications_users_tg_all',
}
export enum defaultCommands {
  START = 'start',
  HELP = 'help',
}
export enum mainScenes {
  USER_TG_ADD_SCENE = 'user_tg_add_scene',
  USER_TG_DELETE_SCENE = 'user_tg_delete_scene',
  DEVICE_ADD_SCENE = 'device_add_scene',
  DEVICE_DELETE_SCENE = 'device_delete_scene',
  DEVICE_UPDATE_SCENE = 'device_update_scene',
  NOTIFICATIONS_USERS_TG_ALL_SCENE = 'notifications_users_tg_all_scene',
}
export enum additionalScenesButtons {
  btnCancel = 'btn_cancel',
  btnTypeObject = 'btn_type_object',
}

export interface buttonsTypeObjectType {
  id: number;
  name: string;
  type: string;
}

/* ЭТИ ДАННЫЕ ДОЛЖНЫ БЫТЬ В БД! */
export const buttonsTypeObject: Array<buttonsTypeObjectType> = [
  { id: 1, name: 'ТП', type: 'type_object_tp' },
  { id: 2, name: 'РП', type: 'type_object_rp' },
  { id: 3, name: 'ПС', type: 'type_object_ps' },
  { id: 4, name: 'Реклоузер', type: 'type_object_rekloyzer' },
  { id: 5, name: 'Разъединитель', type: 'type_object_razedinitel' },
];
