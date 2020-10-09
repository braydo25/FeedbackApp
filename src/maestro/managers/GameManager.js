import { Manager } from 'react-native-maestro';

export default class GameManager extends Manager {
  static get instanceKey() {
    return 'gameManager';
  }

  static initialStore = {
    currentTrackIndex: 0,
    currentTrackComments: [],
    tracks: null,
  }

  get storeName() {
    return 'game';
  }

  async loadTracks() {
    const { apiHelper } = this.maestro.helpers;
    const { store } = this;
    const tracks = (store.tracks) ? [ ...store.tracks ] : [];
    const response = await apiHelper.get({
      path: '/game',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this.updateStore({ tracks: [ ...tracks, ...response.body ] });

    return response.body;
  }

  async createTrackComment(text) {
    const { levelsHelper } = this.maestro.helpers;
    const { playbackManager, tracksManager, userManager } = this.maestro.managers;
    const currentTrack = this.getCurrentTrack();
    const trackId = currentTrack.id;
    const user = userManager.store.user;
    const time = await playbackManager.getCurrentTrackPosition();
    const nonce = `n-${Date.now()}`;
    let trackComment = null;

    this._addCurrentTrackComment({ user, text, time, nonce });

    try {
      trackComment = await tracksManager.createTrackComment({ trackId, text, time });

      if (this.getCurrentTrack().id === trackId) { // prevent adding to next track if user changed cards while loading
        this._addCurrentTrackComment({ ...trackComment, user, nonce });
      }

      userManager.updateLocalUser({ exp: user.exp + levelsHelper.commentExp });
    } catch (error) {
      this._removeCurrentTrackComment(nonce);

      throw error;
    }

    return trackComment;
  }

  getCurrentTrack() {
    const { tracks, currentTrackIndex } = this.store;

    return (tracks) ? tracks[currentTrackIndex] : null;
  }

  getNextTrack() {
    const { tracks, currentTrackIndex } = this.store;

    return (tracks) ? tracks[currentTrackIndex + 1] : null;
  }

  nextTrackAnimated() {
    this.maestro.dispatchEvent('GAME_ANIMATE_NEXT_TRACK');
  }

  nextTrack() {
    this.updateStore({
      currentTrackComments: [],
      currentTrackIndex: this.store.currentTrackIndex + 1,
    });
  }

  /*
   * Helpers
   */

  _addCurrentTrackComment = trackComment => {
    const currentTrackComments = [ ...this.store.currentTrackComments ];
    const { nonce } = trackComment;
    const existingIndex = currentTrackComments.findIndex(trackComment => {
      return nonce && trackComment.nonce === nonce;
    });

    if (existingIndex !== -1) {
      currentTrackComments[existingIndex] = trackComment;
    } else {
      currentTrackComments.unshift(trackComment);
    }

    this.updateStore({ currentTrackComments });
  }

  _removeCurrentTrackComment = nonce => {
    const currentTrackComments = this.store.currentTrackComments.filter(trackComment => {
      return trackComment.nonce !== nonce;
    });

    this.updateStore({ currentTrackComments });
  }
}
