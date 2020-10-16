import 'expo-asset';
import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import * as Sentry from '@sentry/react-native';
import playbackService from './src/services/playback';
import App from './src/App';

Sentry.init({ dsn: 'https://f5ed2ced415748ac9cb3aeaf8ffd5e49@o460720.ingest.sentry.io/5461445' });

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => playbackService);
