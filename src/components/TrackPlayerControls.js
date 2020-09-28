import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import TrackPlayerScrubber from './TrackPlayerScrubber';
import maestro from '../maestro';

const { playbackManager } = maestro.managers;

export default class TrackPlayerControls extends Component {
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
    this.setState({ playbackState: playback.state });
  }

  _playPause = () => {
    const { playbackState } = this.state;

    if ([ 'ready', 'paused', 'connecting', 'stopped' ].includes(playbackState)) {
      playbackManager.play();
    }

    if ([ 'playing', 'buffering' ].includes(playbackState)) {
      playbackManager.pause();
    }
  }

  render() {
    const { track, style } = this.props;
    const { playbackState } = this.state;

    return (
      <View style={[ styles.container, style ]}>
        <TouchableOpacity onPress={this._playPause} style={styles.playPauseButton}>
          {playbackState === 'playing' && (
            <Image
              source={require('../assets/images/pause.png')}
              resizeMode={'contain'}
              style={styles.pauseIcon}
            />
          )}

          {[ 'ready', 'paused', 'stopped' ].includes(playbackState) && (
            <Image
              source={require('../assets/images/play.png')}
              resizeMode={'contain'}
              style={styles.playIcon}
            />
          )}

          {[ 'loading', 'buffering', 'connecting', 'none' ].includes(playbackState) && (
            <ActivityIndicator color={'#FFFFFF'} />
          )}
        </TouchableOpacity>

        <TrackPlayerScrubber waveform={track.waveform} />
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
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
