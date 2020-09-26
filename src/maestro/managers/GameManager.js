import { Manager } from 'react-native-maestro';

export default class GameManager extends Manager {
  static get instanceKey() {
    return 'gameManager';
  }

  static initialStore = {
    currentTrackIndex: 0,
    tracks: null,
  }

  get storeName() {
    return 'game';
  }

  async loadTracks(queryParams) {
    const { playbackManager } = this.maestro.managers;

    return new Promise(resolve => {
      setTimeout(() => {
        const data = [
          {
            id: 1,
            name: 'Cruise Control',
            user: {
              name: 'Instant Party!',
              avatarAttachment: {
                url: 'https://i1.sndcdn.com/avatars-IJ52gMPcubnJFBoR-IWsAFQ-t500x500.jpg',
              },
            },
            length: 158,
            url: 'https://srv-file21.gofile.io/downloadStore/srv-store3/CxgRHx/y2mate.com%20-%20Instant%20Party!%20-%20Cruise%20Control%20(Original)_6z3tbypUlt8.mp3',
            createdAt: new Date(),
          },
          {
            id: 2,
            name: 'Bite Me',
            user: {
              name: 'Wingman',
              avatarAttachment: {
                url: 'https://i1.sndcdn.com/avatars-000334552945-s56jrg-t500x500.jpg',
              },
            },
            length: 222,
            url: 'https://srv-file21.gofile.io/downloadStore/srv-store3/HRwaEz/y2mate.com%20-%20Bite%20Me%20-%20Wingman_wuXzjF3qQt4.mp3',
            createdAt: new Date(),
          },
          {
            id: 3,
            name: 'Stars Tonight',
            user: {
              name: 'Zeds Dead',
              avatarAttachment: {
                url: 'https://yt3.ggpht.com/a/AATXAJxmKfmbVI5p84QuUhd_09ATSGMx7MacLKgFBzLpWQ=s176-c-k-c0xffffffff-no-nd-rj',
              },
            },
            length: 173,
            url: 'https://srv-file21.gofile.io/downloadStore/srv-store2/C6Go3M/y2mate.com%20-%20Zeds%20Dead%20x%20DROELOE%20-%20Stars%20Tonight_M6jZKtNIOG4.mp3',
            createdAt: new Date(),
          },
        ];

        //playbackManager.queueTracks(data);

        this.updateStore({ tracks: data });

        resolve();
      }, 1);
    });
  }

  async createTrackFeedback() {
    // need to know time!
  }

  getCurrentTrack() {
    return this.store.tracks[this.store.currentTrackIndex];
  }

  nextTrackAnimated() {
    this.maestro.dispatchEvent('GAME_NEXT_TRACK_ANIMATED');
  }

  nextTrack() {
    this.updateStore({ currentTrackIndex: this.store.currentTrackIndex + 1 });
  }

  /*
   * Helpers
   */
}
