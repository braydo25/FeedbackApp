import { Platform } from 'react-native';
import { Helper } from 'react-native-maestro';
import * as Device from 'expo-device';

const DEVICE_UUID_KEY = 'DEVICE_UUID_KEY';

export default class DeviceHelper extends Helper {
  static get instanceKey() {
    return 'deviceHelper';
  }

  async getDeviceDetails() {
    return {
      isDevice: Device.isDevice,
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      modelName: Device.modelName,
      modelId: (Platform.OS === 'ios') ? Device.modelId : null,
      designName: (Platform.OS === 'android') ? Device.designName : null,
      productName: (Platform.OS === 'android') ? Device.productName : null,
      deviceYearClass: Device.deviceYearClass,
      totalMemory: Device.totalMemory,
      supportedCpuArchitectures: Device.supportedCpuArchitectures,
      osName: Device.osName,
      osVersion: Device.osVersion,
      osBuildId: Device.osBuildId,
      osInternalBuildId: Device.osInternalBuildId,
      osBuildFingerprint: (Platform.OS === 'android') ? Device.osBuildFingerprint : null,
      platformApiLevel: (Platform.OS === 'android') ? Device.platformApiLevel : null,
      deviceName: Device.deviceName,
    };
  }

  async getUUID() {
    const { asyncStorageHelper } = this.maestro.helpers;
    const existingUUID = await asyncStorageHelper.getItem(DEVICE_UUID_KEY);

    if (!existingUUID) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

      await asyncStorageHelper.setItem(DEVICE_UUID_KEY, uuid);

      return uuid;
    }

    return existingUUID;
  }
}
