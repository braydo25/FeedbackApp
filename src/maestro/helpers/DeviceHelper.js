import { Platform } from 'react-native';
import { Helper } from 'react-native-maestro';
import Device from 'expo-device';

export default class DevicerHelper extends Helper {
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
}
