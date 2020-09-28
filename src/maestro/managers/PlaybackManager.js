import { Manager } from 'react-native-maestro';
import TrackPlayer from 'react-native-track-player';

let resolveInitialReadyPromise = null;

// DEBUG! otherwise track player won't reset on fast refreshes.
TrackPlayer.stop(); // react native debugging.
TrackPlayer.destroy();
// END DEBUG

export default class PlaybackManager extends Manager {
  static get instanceKey() {
    return 'playbackManager';
  }

  static initialStore = {
    state: 'none',
    ready: new Promise(resolve => resolveInitialReadyPromise = resolve),
  }

  constructor(maestro) {
    super(maestro);

    TrackPlayer.setupPlayer({ playBuffer: 1.5 }).then(() => {
      TrackPlayer.addEventListener('playback-state', this._playbackStateChanged);
      resolveInitialReadyPromise();
    });
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

  async queueTrack(track) {
    return TrackPlayer.add(this._trackToTrackObject(track));
  }

  async play() {
    await this.store.ready;

    TrackPlayer.play();
  }

  async pause() {
    await this.store.ready;

    TrackPlayer.pause();
  }

  async next() {
    await this.store.ready;

    TrackPlayer.skipToNext();
  }

  /*
   * Helpers
   */

  _trackToTrackObject = track => {
    return {
      id: `track_${track.id}`,
      url: track.mp3Url,
      title: track.name,
      artist: track.user.name,
      date: track.createdAt.toISOString(),
      artwork: track.user.avatarUrl,
    };
  }

  _playbackStateChanged = ({ state }) => {
    this.updateStore({ state });
  }
}
