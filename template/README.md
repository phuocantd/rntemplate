# ProjectName

Starter project generated from `phuocantd/rntemplate`.

## Tech Stack

- React Native 0.84.x
- TypeScript
- Redux Toolkit + Redux Saga
- React Query
- React Navigation
- i18next (`en`, `vi`)
- `twrnc` (Tailwind-style utilities)
- Android flavors: `dev`, `stag`, `prod`

## Requirements

- Node.js `>= 22.11.0`
- Android Studio (for Android)
- Xcode + CocoaPods (for iOS)
- Environment setup from React Native docs:
	https://reactnative.dev/docs/set-up-your-environment

## Installation

Install JavaScript dependencies:

```sh
npm install
```

Install iOS pods (macOS):

```sh
bundle install
bundle exec pod install
```

## Run App

Start Metro:

```sh
npm start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
npm run ios
```

## Android Flavors

This project includes 3 environments:

- `dev`
- `stag`
- `prod`

Run debug builds by flavor:

```sh
npm run dev
npm run stag
npm run prod
```

Build release APK:

```sh
npm run devapk
npm run stagapk
npm run prodapk
```

Build release AAB:

```sh
npm run devaab
npm run stagaab
npm run prodaab
```

Scripts automatically map `ENVFILE` to:

- `.env.dev`
- `.env.stag`
- `.env.prod`

If you build directly from Android Studio/Gradle, choose the matching flavor for the target environment.

## Project Structure

```text
src
├── assets
│   └── svg
├── components
│   ├── common
│   └── input
├── configs
│   └── constants
├── containers
│   ├── about
│   ├── home
│   └── login
├── features
│   └── auth
├── hooks
├── i18n
├── navigation
├── services
│   └── api
├── store
├── types
└── utils
```

## Useful Commands

```sh
npm run lint
npm test
```

## Notes

- Change app entry UI in `App.tsx`.
- Native Android config is in `android/`.
- Native iOS config is in `ios/`.

## References

- React Native: https://reactnative.dev
- Environment setup: https://reactnative.dev/docs/set-up-your-environment
- Troubleshooting: https://reactnative.dev/docs/troubleshooting
