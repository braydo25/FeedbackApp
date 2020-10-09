import { Helper } from 'react-native-maestro';
import { Alert, Platform, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class FilesHelper extends Helper {
  static get instanceKey() {
    return 'filesHelper';
  }

  async selectImage(options) {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

      if (status !== 'granted') {
        return Alert.alert('Permissions Required', 'You must give Soundhouse camera roll permissions in order to select an image. Do you want to fix this now?', [
          {
            text: 'Fix Now',
            onPress: () => Linking.openURL('app-settings:'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      }
    }

    return ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      ...options,
    });
  }
}
