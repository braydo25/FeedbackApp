# Over The Air Updates

Publish update to production: `expo publish --release-channel production`

To test published updates, you must be in release mode on Android or iOS. Published updates will not be checked for in debug mode.
IOS: `react-native run-ios --configuration Release`
Android: `react-native run-android --variant=release`