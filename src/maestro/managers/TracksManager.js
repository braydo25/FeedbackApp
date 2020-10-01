import { Manager } from 'react-native-maestro';

export default class TracksManager extends Manager {
  static get instanceKey() {
    return 'tracksManager';
  }

  static initialStore = {
    tracks: null,
  }

  get storeName() {
    return 'tracks';
  };

  async createTrack(fields) {
    const { apiHelper } = this.maestro.helpers;
    const { audioBlob, audioUri, ...data } = fields;
    const response = await apiHelper.uploadFiles({
      method: 'POST',
      path: '/tracks',
      files: [
        {
          key: 'audio',
          blob: audioBlob,
          uri: audioUri,
          name: (audioUri) ? audioUri.substring(audioUri.lastIndexOf('/') + 1) : undefined,
        },
      ],
      data,
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }
}
