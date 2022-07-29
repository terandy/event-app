import { Platform } from "react-native";

export const DRAWER_HEIGHT = 1000;
export const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 48;

export const ICON_SIZE =
  Platform.OS === "ios" ? { small: 32, medium: 42 } : { small: 26, medium: 32 };

export const CITIES = ["MTL", "TOR", "VAN"];
export const HATS = ["YSP", "UPF", "WFWP", "FFWPU"];
export const HAT_COLORS = {
  YSP: "i1",
  UPF: "r1",
  WFWP: "t1",
  FFWPU: "y1",
};
export const FREQUENCY_OPTIONS = [
  { value: "DAILY", label: "daily" },
  { value: "WEEKLY", label: "weekly" },
  { value: "BIWEEKLY", label: "biweekly" },
  { value: "MONTHLY", label: "monthly" },
  { value: "BIMONTHLY", label: "bimonthly" },
  { value: "QUARTERLY", label: "quarterly" },
  { value: "SEMIANUALLY", label: "semi-annually" },
  { value: "YEARLY", label: "yearly" },
];

export const REMINDER_TIMES = [
  { value: 5, label: "5 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 60 * 12, label: "12 hours" },
  { value: 60 * 24, label: "24 hours" },
];

export const DEFAULT_USER_SETTINGS = {
  cities: CITIES,
  hats: HATS,
  isEnabled: true,
  reminderTime: 15,
};

export const CALENDAR_NAME = "UPF Calendar";

export const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
