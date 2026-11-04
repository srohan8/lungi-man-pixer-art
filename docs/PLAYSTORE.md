# Android app and Google Play setup

The game is wrapped with Capacitor. The web game stays one `index.html` plus `assets/`. The Android project lives in `android/`.
`npm run build:web` copies the game into `www/` (without spare audio takes), `npx cap sync android` copies it into the app.

## 1. Get an APK to try on your phone (no Play Store needed)
1. Push to GitHub. The **Android build** workflow runs on every push to `main` (or run it by hand: Actions, Android build, Run workflow).
2. When it finishes, open the run and download the artifact **lungi-man-debug-apk**.
3. Unzip, copy the `.apk` to your phone, open it. Android asks you to allow installs from that source once.
The debug APK is for testing only. Google Play does not accept it.

## 2. Decide the app id before anything else
`capacitor.config.json` and `android/app/build.gradle` use **`studio.moonga.lungiman`** as the package name.
**The package name can never change after the first Play upload.** If you want a different one, change it now in:
`capacitor.config.json` (`appId`), `android/app/build.gradle` (`namespace`, `applicationId`), and move
`android/app/src/main/java/studio/moonga/lungiman/` to match.

## 3. Create the upload key (once, keep it safe)
You sign the app with an **upload key**. Google Play App Signing then re-signs it with Google's own key.
Run once on your machine (needs Java; `keytool` comes with it):
```bash
keytool -genkeypair -v -keystore lungiman-upload.jks -alias lungiman -keyalg RSA -keysize 2048 -validity 10000
```
- Choose strong passwords and write them in a password manager. Back the `.jks` file up somewhere private.
- **Never commit the `.jks` file or the passwords.** `.gitignore` already blocks `*.jks`.
- If you lose the upload key you can ask Google to reset it, but it takes days.

## 4. Give GitHub the signing secrets
Repository, Settings, Secrets and variables, Actions, New repository secret. Add four:
| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | the `.jks` file as base64 (Windows PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("lungiman-upload.jks"))`) |
| `ANDROID_KEYSTORE_PASSWORD` | the keystore password |
| `ANDROID_KEY_ALIAS` | `lungiman` (the alias you chose) |
| `ANDROID_KEY_PASSWORD` | the key password |
With these set, each run also produces **lungi-man-release** containing the signed `.aab` (upload this to Play) and a signed `.apk`.
Each run uses its run number as the `versionCode`, so every upload is higher than the last. Pick the player-facing version
with the *version_name* box when you run the workflow by hand.

## 5. Google Play Console account
1. Sign up at play.google.com/console. One-time registration fee (about 25 USD). You need a Google account and an ID check.
2. Choose **Personal** or **Organisation**. **Personal accounts created after Nov 2023 must run a closed test with at least 12 testers
   for 14 days before they can publish to production.** Organisation accounts skip this but need a D-U-N-S number.
   Check the current rules in the Console, they change.
3. Create app: name *Kanjiravanam Chronicles* (Play allows 30 characters; the full title "Kannan and the Kanjiravanam Chronicles" is 38, so use it in the description and the graphics), default language, **Game**, **Free**, accept the declarations.

## 6. Store listing (Grow, Store presence, Main store listing)
You must supply:
- **App name** (30 characters), **short description** (80), **full description** (4000).
- **App icon** 512 x 512 PNG. The in-app launcher icon is still the default Capacitor one: replace the files in
  `android/app/src/main/res/mipmap-*` (Android Studio, Image Asset tool, makes all sizes from one 1024 PNG).
- **Feature graphic** 1024 x 500 PNG.
- **Phone screenshots**: at least 2 (landscape is fine). Take them from the game in a browser at 844 x 390 or on the phone.
- Category: Games, Arcade or Action.

## 7. App content declarations (Policy and programs, App content)
- **Privacy policy URL**: required for every app. The game collects nothing, so a short page saying so is enough.
  Host it on GitHub Pages or any page you control.
- **Data safety**: the game stores a high score and sound setting on the device only, collects no data, and has no accounts.
  Answer "no data collected, no data shared".
- **Ads**: no. **Target audience**: pick 13+ or all ages honestly. If you include under-13s, the Families policy applies.
- **Content rating**: fill the questionnaire. There is cartoon fantasy violence (throwing coconuts, defeating spirits), no blood,
  no gambling, no online interaction.
- **Government apps / financial / health**: no.

## 8. Upload and release
1. Testing, **Internal testing**, Create release, upload the `.aab`. Add yourself as a tester and install from the Play link.
2. When it works, create a **Closed testing** release (needed for the 14-day rule on personal accounts), then **Production**.
3. Every new upload needs a higher `versionCode`. The workflow does this automatically.
Review usually takes from hours to a few days for a first release.

## 9. Before the first public release
- Playtest on a real phone: landscape lock, full screen, button size, audio, performance.
- Confirm licences in `docs/audio-credits.md`: the ElevenLabs terms for your plan, and the Pixabay engine sound (it is mixed
  into `bgm_bike.ogg`).
- Replace the launcher icon and splash screen.
- Target API level: Google raises the minimum every year. Capacitor sets `targetSdkVersion` 36 now. Re-check when you update Capacitor.

## What the app does and does not request
- Landscape only (`sensorLandscape`), full-screen with system bars hidden (swipe from the edge to show them).
- The manifest keeps the default `INTERNET` permission Capacitor adds. The game makes no network calls. You can remove that line from
  `android/app/src/main/AndroidManifest.xml` to keep the permission list empty, then run the workflow and test before shipping.
