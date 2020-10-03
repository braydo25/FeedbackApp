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
    currentTrackId: null,
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

  async play(track) {
    await this.store.ready;

    const { currentTrackId } = this.store;

    if (track.id !== currentTrackId) {
      await TrackPlayer.reset();
      await TrackPlayer.add(this._trackToTrackObject(track));

      this.updateStore({ currentTrackId: track.id });
    }

    return TrackPlayer.play();
  }

  async pause() {
    await this.store.ready;

    TrackPlayer.pause();
  }

  async getCurrentTrackPosition() {
    const position = await TrackPlayer.getPosition();

    return Math.floor(position);
  }

  async getCurrentTrackId() {
    return TrackPlayer.getCurrentTrack();
  }

  /*
   * Helpers
   */

  _trackToTrackObject = track => {
    return {
      id: `${track.id}`,
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
