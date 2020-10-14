import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Image from './Image';
import { STATE_READY, STATE_PAUSED, STATE_STOPPED, STATE_PLAYING, STATE_BUFFERING } from 'react-native-track-player';
import TrackPlayerScrubber from './TrackPlayerScrubber';
import maestro from '../maestro';

const { playbackManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

export default class TrackPlayerControls extends PureComponent {
  playbackState = STATE_STOPPED;

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ playback }) {
    const { track } = this.props;
    const { currentTrackId } = playbackManager.store;
    const playbackState = (track.id === currentTrackId) ? playback.state : STATE_STOPPED;

    if (this.playbackState !== playbackState) {
      this.playbackState = playbackState;
      this.forceUpdate();
    }
  }

  _playPause = () => {
    const { track } = this.props;
    const { playbackState } = this;

    if ([ STATE_READY, STATE_PAUSED, STATE_STOPPED, 'loading' ].includes(playbackState)) {
      playbackManager.play(track);
    }

    if ([ STATE_PLAYING, STATE_BUFFERING ].includes(playbackState)) {
      playbackManager.pause();
    }
  }

  render() {
    const { onSeek, track, style } = this.props;
    const { playbackState } = this;
    const hasTrack = !!track.mp3Url;

    return (
      <View style={[ styles.container, style ]}>
        <TouchableOpacity disabled={!track.mp3Url} onPress={this._playPause} style={styles.playPauseButton}>
          {(hasTrack && playbackState === STATE_PLAYING) && (
            <Image
              source={require('../assets/images/pause.png')}
              resizeMode={'contain'}
              style={styles.pauseIcon}
            />
          )}

          {(hasTrack && [ STATE_READY, STATE_PAUSED, STATE_STOPPED ].includes(playbackState)) && (
            <Image
              source={require('../assets/images/play.png')}
              resizeMode={'contain'}
              style={styles.playIcon}
            />
          )}

          {(!hasTrack || [ STATE_BUFFERING, 'buffering' ].includes(playbackState)) && (
            <ActivityIndicator color={'#FFFFFF'} />
          )}
        </TouchableOpacity>

        {!!hasTrack && (
          <TrackPlayerScrubber onSeek={onSeek} track={track} />
        )}

        {!hasTrack && (
          <Text style={styles.uploadingText}>Uploading Track...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pauseIcon: {
    height: '35%',
    width: '35%',
  },
  playIcon: {
    height: '40%',
    marginLeft: 2,
    width: '35%',
  },
  playPauseButton: {
    alignItems: 'center',
    backgroundColor: '#7D4CCF',
    borderRadius: 20,
    height: interfaceHelper.deviceValue({ default: 40, xs: 35 }),
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
    width: interfaceHelper.deviceValue({ default: 40, xs: 35 }),
  },
  uploadingText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginLeft: 16,
  },
});
