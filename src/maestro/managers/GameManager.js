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
            id: 4,
            name: 'Bite Me',
            user: {
              name: 'Wingman',
              avatarUrl: 'https://i1.sndcdn.com/avatars-000334552945-s56jrg-t500x500.jpg',
            },
            duration: 222,
            mp3Url: 'https://srv-file21.gofile.io/downloadStore/srv-store3/HRwaEz/y2mate.com%20-%20Bite%20Me%20-%20Wingman_wuXzjF3qQt4.mp3',
            genre: { name: 'EDM' },
            waveform: [7,6,85,77,76,62,57,59,66,66,67,75,92,87,95,97,92,96,96,91,94,92,93,98,97,97,94,92,94,96,95,99,99,93,100,96,93,86,85,92,100,98,78,94,86,87,88,96,77,84,88,93,91,91,93,94,86,84,97,100,94,96,96,100,100,98,82,92,95,100,96,99,95,92,99,98,98,100,100,97,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,96,96,28,29,31,29,36,32,25,25,37,40,36,41,36,43,39,47,29,37,45,50,100,99,96,97,100,100,95,93,93,100,97,99,99,98,96,98,100,100,96,97,96,99,100,100,100,100,100,99,100,99,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,100,98,98,99,100,98,98,100,99,100,99,96,97,99,99,100,99,97,100,99,100,96,94,5,5,0,2,0,1,0,0],
            createdAt: new Date(),
          },
          {
            id: 1,
            name: 'All I need',
            description: 'To celebrate the @fortnite x @rocketleague concert, I’m releasing “All I Need” with my friends at @monstercat this Friday !!!',
            user: {
              name: 'Slushii',
              avatarUrl: 'https://i1.sndcdn.com/avatars-yP66anDdEEZwyyNX-XkxQvw-t500x500.jpg',
            },
            duration: 225,
            mp3Url: 'https://testing-babble-uploads.s3.amazonaws.com/40ialmqtsi/a6cc96f748524a68ad8073e5a112fea0.mp3',
            genre: { name: 'EDM' },
            waveform: [7,6,85,77,76,62,57,59,66,66,67,75,92,87,95,97,92,96,96,91,94,92,93,98,97,97,94,92,94,96,95,99,99,93,100,96,93,86,85,92,100,98,78,94,86,87,88,96,77,84,88,93,91,91,93,94,86,84,97,100,94,96,96,100,100,98,82,92,95,100,96,99,95,92,99,98,98,100,100,97,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,96,96,28,29,31,29,36,32,25,25,37,40,36,41,36,43,39,47,29,37,45,50,100,99,96,97,100,100,95,93,93,100,97,99,99,98,96,98,100,100,96,97,96,99,100,100,100,100,100,99,100,99,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,100,98,98,99,100,98,98,100,99,100,99,96,97,99,99,100,99,97,100,99,100,96,94,5,5,0,2,0,1,0,0],
            createdAt: new Date(),
          },

          {
            id: 5,
            name: 'Stars Tonight',
            description: 'check out our collab with @droeloemusic! "Stars Tonight" is out now on @deadbeatsrecords',
            user: {
              name: 'Zeds Dead',
              avatarUrl: 'https://yt3.ggpht.com/a/AATXAJxmKfmbVI5p84QuUhd_09ATSGMx7MacLKgFBzLpWQ=s176-c-k-c0xffffffff-no-nd-rj',
            },
            duration: 173,
            mp3Url: 'https://srv-file21.gofile.io/downloadStore/srv-store2/C6Go3M/y2mate.com%20-%20Zeds%20Dead%20x%20DROELOE%20-%20Stars%20Tonight_M6jZKtNIOG4.mp3',
            genre: { name: 'EDM' },
            waveform: [7,6,85,77,76,62,57,59,66,66,67,75,92,87,95,97,92,96,96,91,94,92,93,98,97,97,94,92,94,96,95,99,99,93,100,96,93,86,85,92,100,98,78,94,86,87,88,96,77,84,88,93,91,91,93,94,86,84,97,100,94,96,96,100,100,98,82,92,95,100,96,99,95,92,99,98,98,100,100,97,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,96,96,28,29,31,29,36,32,25,25,37,40,36,41,36,43,39,47,29,37,45,50,100,99,96,97,100,100,95,93,93,100,97,99,99,98,96,98,100,100,96,97,96,99,100,100,100,100,100,99,100,99,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,100,98,98,99,100,98,98,100,99,100,99,96,97,99,99,100,99,97,100,99,100,96,94,5,5,0,2,0,1,0,0],
            createdAt: new Date(),
          },
          {
            id: 3,
            name: 'Cruise Control',
            user: {
              name: 'Instant Party!',
              avatarUrl: 'https://i1.sndcdn.com/avatars-IJ52gMPcubnJFBoR-IWsAFQ-t500x500.jpg',
            },
            duration: 158,
            mp3Url: 'https://srv-file21.gofile.io/downloadStore/srv-store3/CxgRHx/y2mate.com%20-%20Instant%20Party!%20-%20Cruise%20Control%20(Original)_6z3tbypUlt8.mp3',
            genre: { name: 'EDM' },
            waveform: [7,6,85,77,76,62,57,59,66,66,67,75,92,87,95,97,92,96,96,91,94,92,93,98,97,97,94,92,94,96,95,99,99,93,100,96,93,86,85,92,100,98,78,94,86,87,88,96,77,84,88,93,91,91,93,94,86,84,97,100,94,96,96,100,100,98,82,92,95,100,96,99,95,92,99,98,98,100,100,97,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,96,96,28,29,31,29,36,32,25,25,37,40,36,41,36,43,39,47,29,37,45,50,100,99,96,97,100,100,95,93,93,100,97,99,99,98,96,98,100,100,96,97,96,99,100,100,100,100,100,99,100,99,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,100,98,98,99,100,98,98,100,99,100,99,96,97,99,99,100,99,97,100,99,100,96,94,5,5,0,2,0,1,0,0],
            createdAt: new Date(),
          },
        ];

        playbackManager.queueTracks(data);

        this.updateStore({ tracks: data });

        resolve();
      }, 1);
    });
  }

  async createTrackFeedback(text) {
    const { playbackManager } = this.maestro.managers;
    const time = await playbackManager.getCurrentTrackPosition();

    this.maestro.dispatchEvent('GAME_FEEDBACK_CREATED', {
      id: Math.floor(Math.random() * 1000),
      text,
      time,
    });
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
    this.updateStore({ currentTrackIndex: this.store.currentTrackIndex + 1 });
  }

  /*
   * Helpers
   */
}
