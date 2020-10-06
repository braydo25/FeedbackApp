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

  async getTrack(trackId) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: `/tracks/${trackId}`,
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }

  async getTrackComments(trackId) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: `/tracks/${trackId}/comments`,
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  }

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

  async createTrack() {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: '/tracks',
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
    const { audioBlob, audioUri, ...data } = fields;
    const { apiHelper } = this.maestro.helpers;
    const response = (!audioBlob && !audioUri) ? await apiHelper.patch({
      path: `/tracks/${trackId}`,
      data,
    }) : await apiHelper.uploadFiles({
      method: 'PATCH',
      path: `/tracks/${trackId}`,
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

    this._addUpdateTrack(response.body);

    return response.body;
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

  /*
   * Helpers
   */

  _addUpdateTrack = track => {
    const tracks = [ ...this.store.tracks ];
    const trackId = track.id;
    const existingIndex = tracks.findIndex(track => track.id === trackId);

    if (existingIndex !== -1) {
      tracks[existingIndex] = { ...tracks[existingIndex], ...track };
    } else {
      tracks.unshift(track);
    }

    this.updateStore({ tracks });
  }
}
