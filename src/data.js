import { Platform } from 'react-native';

export const DRAWER_HEIGHT = 600;
export const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 48;

export const ICON_SIZE =
  Platform.OS === 'ios' ? { small: 32, medium: 42 } : { small: 26, medium: 32 };

export const CITIES = ['MTL', 'TOR', 'VAN'];
export const HATS = ['YSP', 'UPF', 'WFWP', 'FFWPU'];
export const HAT_COLORS = {
  YSP: 'p1',
  UPF: 'r1',
  WFWP: 't1',
  FFWPU: 'y1'
};

export const DEFAULT_USER_SETTINGS = {
  cities: CITIES,
  hats: HATS,
  isEnabled: true,
  reminderTime: 15
};

export const CALENDAR_NAME = 'UPF Calendar';

export const DAYS_OF_THE_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
