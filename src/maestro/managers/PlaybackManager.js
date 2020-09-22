import { Manager } from 'react-native-maestro';

export default class PlaybackManager extends Manager {
  static get instanceKey() {
    return 'playbackManager';
  }

  static initialStore = {

  }

  constructor(maestro) {
    super(maestro);
  }

  get storeName() {
    return 'playback';
  }

  async queueTracks(tracks) {
    const promises = [];

    tracks.forEach(track => {
      promises.push(this.queueTrack(track));
    });

    return Promise.all(promises);
  }

  play() {

  }

  pause() {

  }

  next() {

  }

  /*
   * Helpers
   */

  _trackToPlaybackStructure = track => {
    return {
      
    };
  }
}
