import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import playbackService from './src/services/playback';
import App from './src/App';

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => playbackService);
