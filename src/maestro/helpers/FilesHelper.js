import { Helper } from 'react-native-maestro';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class FilesHelper extends Helper {
  static get instanceKey() {
    return 'filesHelper';
  }

  async selectImage(options) {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

      if (status !== 'granted') {
        // Show a alert to allow user to go to settings to enable the permission.
      }
    }

    return ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      ...options,
    });
  }
}
