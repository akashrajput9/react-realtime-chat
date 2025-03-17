// @mui
import { enUS, frFR, zhCN, viVN, arSD } from '@mui/material/locale';

// routes
import { PATH_DASHBOARD } from "./routes/paths";
import { apifetch } from './utils/fetchApi';

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSD,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
];

export const getRoles = () => apifetch(`/roles`);
export const getPermissions = () => apifetch(`/permissions`);
export const createRole = (name) => apifetch(`/roles`, { name });
export const assignPermission = (roleId, permissionName) =>
  apifetch(`/roles/${roleId}/permissions`, { permission: permissionName });

// New: Delete a role
export const deleteRole = (roleId) => apifetch(`/roles/${roleId}`, {}, 'DELETE');

// New: Update a role
export const updateRole = (roleId, name) =>
  apifetch(`/roles/${roleId}`, { name }, 'PUT');

export const defaultLang = allLangs[0]; // English

// export const BASE_API = "http://realtime-live-chat.test/api";
export const BASE_API = "https://backchat.directwebhost.com/api";
// export const BASE_API = 'http://127.0.0.1:8000/api'
// export const BASE_API = "https://node.directwebhost.com/api";
// export const NODE_SERVER = "http://localhost:3001";
export const NODE_SERVER = "https://nodechat.directwebhost.com/";

// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'
