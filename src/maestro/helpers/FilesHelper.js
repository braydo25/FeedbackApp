import { Helper } from 'react-native-maestro';
import { Alert, Platform, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

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
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Fix Now',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ]);
      }
    }

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      ...options,
    });

    if (image.cancelled) {
      return image;
    }

    if (options.width || options.height) {
      image = await ImageManipulator.manipulateAsync(image.uri, [
        {
          resize: {
            height: options.height,
            width: options.width,
          },
        },
      ], {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      });
    }

    return image;
  }
}
