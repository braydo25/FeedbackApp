import { Manager } from 'react-native-maestro';
import TrackPlayer from 'react-native-track-player';

let resolveInitialReadyPromise = null;

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

    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.addEventListener('playback-state', this._playbackStateChanged);

      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });

      resolveInitialReadyPromise();
    });
  }

  get storeName() {
    return 'playback';
  }

  async play(track) {
    const { currentTrackId } = this.store;

    await this.store.ready;

    if (track.id !== currentTrackId || !(await this._trackIsInQueue(track.id))) {
      this._createCurrentTrackPlay();

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

  async stop() {
    await this.store.ready;

    this._createCurrentTrackPlay();

    return TrackPlayer.stop();
  }

  async seekTo(seconds) {
    await this.store.ready;

    return TrackPlayer.seekTo(seconds);
  }

  async getCurrentTrackPosition() {
    const position = await TrackPlayer.getPosition();

    return Math.floor(position);
  }

  /*
   * Helpers
   */

  _createCurrentTrackPlay = async () => {
    const { tracksManager } = this.maestro.managers;
    const { currentTrackId, currentTrackStartedAt } = this.store;

    if (currentTrackId) {
      tracksManager.createTrackPlay({
        trackId: currentTrackId,
        duration: Math.floor((Date.now() - currentTrackStartedAt) / 1000),
      });
    }
  }

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

  _trackIsInQueue = async (trackId) => {
    try {
      await TrackPlayer.getTrack(`${trackId}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  _playbackStateChanged = ({ state }) => {
    this.updateStore({ state });
  }
}
