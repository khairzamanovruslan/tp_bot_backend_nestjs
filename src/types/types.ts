export enum mainEvents {
  DEVICES_SEARCH = 'devices-search',
  DEVICE_NAME = 'device_name',
  DEVICE_COORDINATES = 'device_coordinates',
  DEVICE_TYPE_OBJECT = 'device_type_object',
}

export enum mainCommands {
  DEVICES_REPORT = 'report',
  DEVICES_REPORT_PC = 'report_pc',
  DEVICE_ADD = 'add_device',
  DEVICE_DELETE = 'delete_device',
  DEVICE_UPDATE = 'update_device',
  USERS_TG_REPORT = 'report_users',
  USER_TG_ADD = 'add_user',
  USER_TG_DELETE = 'delete_user',
  USER_TG_ACCESS = 'report_users_access',
  NOTIFICATIONS_USERS_TG_ALL = 'notifications_users_tg_all',
  BACKUP = 'backup',
}
export enum defaultCommands {
  START = 'start',
  HELP = 'help',
}
export enum mainScenes {
  USER_TG_ADD_SCENE = 'user_tg_add_scene',
  USER_TG_DELETE_SCENE = 'user_tg_delete_scene',
  DEVICES_REPORT_PC_SCENE = 'devices_report_pc_scene',
  DEVICE_ADD_SCENE = 'device_add_scene',
  DEVICE_DELETE_SCENE = 'device_delete_scene',
  DEVICE_UPDATE_SCENE = 'device_update_scene',
  NOTIFICATIONS_USERS_TG_ALL_SCENE = 'notifications_users_tg_all_scene',
}
export enum additionalScenesButtons {
  btnCancel = 'btn_cancel',
}
