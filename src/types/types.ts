export enum mainEvents {
  SUBSTATION_SEARCH = 'substation-search',
  SUBSTATION_NAME = 'substation_name',
  SUBSTATION_COORDINATES = 'substation_coordinates',
}

export enum mainCommands {
  SUBSTATION_REPORT = 'report_tp',
  SUBSTATION_ADD = 'add_tp',
  SUBSTATION_DELETE = 'delete_tp',
  SUBSTATION_UPDATE = 'update_tp',
  USERS_TG_REPORT = 'report_users',
  USER_TG_ADD = 'add_user',
  USER_TG_DELETE = 'delete_user',
  USER_TG_ACCESS = 'report_users_access',
}
export enum defaultCommands {
  START = 'start',
  HELP = 'help',
}
export enum mainScenes {
  USER_TG_ADD_SCENE = 'user_tg_add_scene',
  USER_TG_DELETE_SCENE = 'user_tg_delete_scene',
  SUBSTATION_ADD_SCENE = 'substation_add_scene',
  SUBSTATION_DELETE_SCENE = 'substation_delete_scene',
  SUBSTATION_UPDATE_SCENE = 'substation_update_scene',
}
export enum additionalScenesButtons {
  btnCancel = 'btn_cancel',
}
