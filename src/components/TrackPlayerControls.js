import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Image from './Image';
import TrackPlayerScrubber from './TrackPlayerScrubber';
import maestro from '../maestro';

const { playbackManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

export default class TrackPlayerControls extends PureComponent {
  state = {
    playbackState: 'stopped',
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ playback }) {
    const { track } = this.props;
    const { currentTrackId } = playbackManager.store;

    this.setState({
      playbackState: (track.id === currentTrackId) ? playback.state : 'stopped',
    });
  }

  _playPause = () => {
    const { track } = this.props;
    const { playbackState } = this.state;

    if ([ 'ready', 'paused', 'connecting', 'stopped' ].includes(playbackState)) {
      playbackManager.play(track);
    }

    if ([ 'playing', 'buffering' ].includes(playbackState)) {
      playbackManager.pause();
    }
  }

  render() {
    const { track, style } = this.props;
    const { playbackState } = this.state;
    const hasTrack = !!track.mp3Url;

    const { currentTrackId } = playbackManager.store;

    if (track.id === currentTrackId) {
      console.log(playbackState);
    }

    return (
      <View style={[ styles.container, style ]}>
        <TouchableOpacity disabled={!track.mp3Url} onPress={this._playPause} style={styles.playPauseButton}>
          {(hasTrack && playbackState === 'playing') && (
            <Image
              source={require('../assets/images/pause.png')}
              resizeMode={'contain'}
              style={styles.pauseIcon}
            />
          )}

          {(hasTrack && [ 'ready', 'paused', 'stopped' ].includes(playbackState)) && (
            <Image
              source={require('../assets/images/play.png')}
              resizeMode={'contain'}
              style={styles.playIcon}
            />
          )}

          {(!hasTrack || [ 'loading', 'buffering', 'connecting', 'none' ].includes(playbackState)) && (
            <ActivityIndicator color={'#FFFFFF'} />
          )}
        </TouchableOpacity>

        {!!hasTrack && (
          <TrackPlayerScrubber track={track} />
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
