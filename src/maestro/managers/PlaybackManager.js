import { Manager } from 'react-native-maestro';
import TrackPlayer from 'react-native-track-player';

let resolveInitialReadyPromise = null;

if (__DEV__) { // DEBUG! otherwise track player won't reset on fast refreshes.
  TrackPlayer.stop();
  TrackPlayer.destroy();
}

export default class PlaybackManager extends Manager {
  static get instanceKey() {
    return 'playbackManager';
  }

  static initialStore = {
    state: 'none',
    ready: new Promise(resolve => resolveInitialReadyPromise = resolve),
    currentTrackId: null,
    currentTrackStartedAt: null,
  }

  constructor(maestro) {
    super(maestro);

    TrackPlayer.setupPlayer({ playBuffer: 1.5 }).then(() => {
      TrackPlayer.addEventListener('playback-state', this._playbackStateChanged);
      resolveInitialReadyPromise();
    });

    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
  }

  get storeName() {
    return 'playback';
  }

  async play(track) {
    const { currentTrackId, currentTrackStartedAt } = this.store;
    const { tracksManager } = this.maestro.managers;

    await this.store.ready;

    if (track.id !== currentTrackId) {
      if (currentTrackId) {
        tracksManager.createTrackPlay({
          trackId: currentTrackId,
          duration: Math.floor((Date.now() - currentTrackStartedAt) / 1000),
        });
      }

      await TrackPlayer.reset();
      await TrackPlayer.add(this._trackToTrackObject(track));

      this.updateStore({
        currentTrackId: track.id,
        currentTrackStartedAt: Date.now(),
      });
    }

    return TrackPlayer.play();
  }

  async pause() {
    await this.store.ready;

    return TrackPlayer.pause();
  }

  async stop () {
    await this.store.ready;

    return TrackPlayer.stop();
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
