import { Manager } from 'react-native-maestro';

export default class TracksManager extends Manager {
  static get instanceKey() {
    return 'tracksManager';
  }

  static initialStore = {
    tracks: null,
    setupDeferred: false,
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

  async getUserTracks(userId) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: '/tracks',
      queryParams: { userId },
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

    this._addUpdateTracks(response.body);

    return response.body;
  }

  async createTrack() {
    const { apiHelper } = this.maestro.helpers;
    const { userManager } = this.maestro.managers;
    const response = await apiHelper.post({
      path: '/tracks',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    userManager.updateLocalUser({ totalTracks: (userManager.store.user.totalTracks || 0) + 1 });

    return response.body;
  }

  async createTrackComment({ trackId, text, time }) {
    const { apiHelper, levelsHelper } = this.maestro.helpers;
    const { userManager } = this.maestro.managers;
    const { user } = userManager.store;
    const response = await apiHelper.post({
      path: `/tracks/${trackId}/comments`,
      data: { text, time },
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    userManager.updateLocalUser({ exp: user.exp + levelsHelper.commentExp });

    return response.body;
  }

  async createTrackCommentLike({ trackId, trackCommentId }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: `/tracks/${trackId}/comments/${trackCommentId}/likes`,
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

  async deleteTrackComment({ trackId, trackCommentId }) {
    const { apiHelper, levelsHelper } = this.maestro.helpers;
    const { userManager } = this.maestro.managers;
    const { user } = userManager.store;
    const response = await apiHelper.delete({
      path: `/tracks/${trackId}/comments/${trackCommentId}`,
    });

    if (response.code !== 204) {
      throw new Error(response.body);
    }

    userManager.updateLocalUser({ exp: user.exp - levelsHelper.commentExp });
  }

  async deleteTrackCommentLike({ trackId, trackCommentId, trackCommentLikeId }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.delete({
      path: `/tracks/${trackId}/comments/${trackCommentId}/likes/${trackCommentLikeId}`,
    });

    if (response.code !== 204) {
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

  removeLocalTrack(trackId) {
    this._removeTrack(trackId);
  }

  deferSetup() {
    this.updateStore({ setupDeferred: true });
  }

  /*
   * Helpers
   */

  _addUpdateTracks = tracks => {
    const updatedTracks = (this.store.tracks) ? [ ...this.store.tracks ] : [];

    tracks.forEach(track => {
      const trackId = track.id;
      const existingIndex = updatedTracks.findIndex(updatedTrack => updatedTrack.id === trackId);

      if (existingIndex !== -1) {
        updatedTracks[existingIndex] = { ...updatedTracks[existingIndex], ...track };
      } else {
        updatedTracks.push(track);
      }
    });

    updatedTracks.sort((a, b) => b.createdAt - a.createdAt);

    this.updateStore({ tracks: updatedTracks });
  }

  _addUpdateTrack = track => {
    const tracks = (this.store.tracks) ? [ ...this.store.tracks ] : [];
    const trackId = track.id;
    const existingIndex = tracks.findIndex(track => track.id === trackId);

    if (existingIndex !== -1) {
      tracks[existingIndex] = { ...tracks[existingIndex], ...track };
    } else {
      tracks.unshift(track);
    }

    this.updateStore({ tracks });
  }

  _removeTrack = trackId => {
    const tracks = (this.store.tracks) ? [ ...this.store.tracks ] : [];

    this.updateStore({ tracks: tracks.filter(track => track.id !== trackId) });
  }
}
