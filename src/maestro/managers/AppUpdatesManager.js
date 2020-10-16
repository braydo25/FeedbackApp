import { Manager } from 'react-native-maestro';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';

export default class AppUpdatesHelper extends Manager {
  static get instanceKey() {
    return 'appUpdatesManager';
  }

  async receiveEvent(name, value) {
    const hasNewUpdate = await this.hasNewUpdate();

    if (name === 'APP_STATE_CHANGED' && value === 'active' && hasNewUpdate) {
      this.promptToUpdate();
    }
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

  promptToUpdate() {
    Alert.alert('New Update Available', 'Would you like to update Soundhouse? This will only take a few seconds.', [
      {
        text: 'Update',
        onPress: () => this.update(),
      },
      {
        text: 'Not Now',
        style: 'cancel',
      },
    ]);
  }
}
