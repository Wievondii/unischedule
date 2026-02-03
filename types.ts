export interface Course {
  id: string;
  name: string;
  room: string;
  teacher: string;
  day: number; // 1 = Monday, 7 = Sunday
  startSection: number; // 1-12
  duration: number; // Number of sections
  color: string; // Tailwind bg color class
  weeks: string; // e.g. "1-16"
}

export interface SettingsState {
  showWeekends: boolean;
  showNonCurrentWeek: boolean;
  darkMode: boolean;
  semesterStartDate: string;
  totalWeeks: number;
  weekStartOnSunday?: boolean;
  sectionsPerDay?: number;
}

export interface TimeSlot {
  section: number;
  startTime: string;
  endTime: string;
}

export enum ViewMode {
  WEEKLY = 'WEEKLY',
  DAILY = 'DAILY'
}

export enum Tab {
  SCHEDULE = 'SCHEDULE',
  IMPORT = 'IMPORT',
  SETTINGS = 'SETTINGS'
}
