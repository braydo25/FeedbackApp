import { Helper } from 'react-native-maestro';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';

export default class AppUpdatesHelper extends Helper {
  static get instanceKey() {
    return 'appUpdatesHelper';
  }

  async hasNewUpdate() {
    if (__DEV__) {
      console.log('Cannot check for OTA updates in debug mode.');
      return false;
    }

    const result = await Updates.checkForUpdateAsync();

    return (result) ? result.isAvailable : false;
  }

  async update() {
    const hasUpdate = await this.hasNewUpdate();

    if (!hasUpdate) {
      return;
    }

    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }

  async promptToUpdate() {
    const hasNewUpdate = await this.hasNewUpdate();

    if (!hasNewUpdate) {
      return;
    }

    Alert.alert('New Update Available', 'Would you like to update Soundhouse? This will only take a few seconds.', [
      {
        text: 'Not Now',
        style: 'cancel',
      },
      {
        text: 'Update',
        onPress: () => this.update(),
      },
    ]);
  }
}
