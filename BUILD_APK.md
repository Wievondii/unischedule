# Building UniSchedule as an APK

This document describes how to build UniSchedule as an Android APK with home screen widget support.

## Prerequisites

1. Node.js and npm installed
2. Android Studio installed with SDK
3. Java JDK 17 or higher

## Features in APK

- ✅ Fully offline operation (no API keys needed)
- ✅ Import .ics, .json, and text files
- ✅ Home screen widget for viewing today's schedule
- ✅ Native Android performance
- ✅ Data persistence with Capacitor Storage

## Building APK

### Quick Build (Debug)

```bash
# Install dependencies
npm install

# Build and sync Android project
npm run android:sync

# Build APK
npm run android:build
```

The debug APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Using Android Studio

```bash
# Open Android Studio
npm run android:open
```

Then use Android Studio's build tools to create a signed release APK.

## Manual Steps

If the automated scripts don't work, follow these manual steps:

1. Build the web app:
   ```bash
   npm run build
   ```

2. Sync Capacitor:
   ```bash
   npx cap sync android
   ```

3. Open Android Studio:
   ```bash
   npx cap open android
   ```

4. In Android Studio:
   - Build → Generate Signed Bundle / APK
   - Choose APK
   - Select your keystore (or create a new one for first-time)
   - Build

## Testing

To test on an emulator or connected device:

```bash
npx cap run android
```

### Testing the Widget

After installing the APK:
1. Long-press on the home screen
2. Select "Widgets"
3. Find "UniSchedule"
4. Drag the widget to your home screen
5. The widget will display today's courses

See [WIDGET_GUIDE.md](WIDGET_GUIDE.md) for detailed widget usage instructions.

## Troubleshooting

### Gradle errors
- Ensure Android SDK is properly installed
- Check that ANDROID_HOME environment variable is set
- Update Gradle version in android/gradle/wrapper/gradle-wrapper.properties if needed

### Build failures
- Clean the build: `cd android && ./gradlew clean`
- Invalidate caches in Android Studio
- Sync project with Gradle files

## Notes

- The app requires file access permissions to import .ics and .json files
- Test all import features after building to ensure they work on Android
