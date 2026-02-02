import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unischedule.app',
  appName: 'UniSchedule',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
