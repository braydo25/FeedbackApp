import { Platform } from 'react-native';
import { Helper } from 'react-native-maestro';
import { v4 as uuidv4 } from 'uuid';
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
      const uuid = uuidv4();

      await asyncStorageHelper.setItem(DEVICE_UUID_KEY, uuid);

      return uuid;
    }

    return existingUUID;
  }
}
