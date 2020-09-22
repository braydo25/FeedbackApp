import { Manager } from 'react-native-maestro';

export default class PlaybackManager extends Manager {
  static get instanceKey() {
    return 'playbackManager';
  }

  static initialStore = {
    currentQueueIndex: 0,
    queue: [],
  }

  constructor(maestro) {
    super(maestro);

    /*Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });*/
  }

  get storeName() {
    return 'playback';
  }

  queueTracks(tracks) {

  }

  async queueTrack(track) {
    const queue = [ ...this.store.queue ];

  }

  async play() {
  }

  async pause() {

  }

  async next() {

  }

  /*
   * Helpers
   */

  _trackToQueueObject = track => {
    //const playback = new Audio.Sound();


  }

  _playbackStatusUpdated = playbackStatus => {
    console.log(playbackStatus);
  }
}


/*

{ uri: track.url },
{ isLooping: true, shouldPlay: false },
this._playbackStatusUpdated,
false,

*/