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

  async loadTracks() {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: '/tracks',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this.updateStore({ tracks: response.body });

    return response.body;
  }

  async createTrack({ audioBlob, audioUri, name, description, genreId }) {
    const { apiHelper } = this.maestro.helpers;
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
      data: { name, description, genreId },
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }

  async createTrackComment({ trackId, text, time }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: `/tracks/${trackId}/comments`,
      data: { text, time },
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }

  async createTrackPlay({ trackId, duration }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: `/tracks/${trackId}/plays`,
      data: { duration },
    });

    if (response.code !== 204) {
      throw new Error(response.body);
    }
  }

  async updateTrack({ trackId, fields }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.patch({
      path: `/tracks/${trackId}`,
      data: fields,
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }
  }

  async getGenres() {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: '/genres',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }
}
