import React from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import maestro from '../maestro';

const waveWidth = 2;
const waveSpace = 1;

const { playbackManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

export default class TrackPlayerScrubber extends ProgressComponent {
  state = {
    adjustedWaveform: [],
    seekPercent: 0,
    containerXPosition: 0,
    containerWidth: 0,
  }

  panResponder = null;

  constructor() {
    super();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: ({ nativeEvent }) => {
        const { onSeek, track } = this.props;
        const { currentTrackId } = playbackManager.store;

        if (track.id !== currentTrackId) {
          return; // temp? This just disables seek on non-playing tracks.
        }

        const { containerXPosition, containerWidth } = this.state;
        const xPos = Math.max(nativeEvent.pageX - containerXPosition, 0);
        const xMax = containerWidth;
        const trackDuration = Math.floor(this.state.duration);
        const seekPercent = Math.min(xPos / xMax, 1);
        const seekPosition = Math.floor(seekPercent * trackDuration);

        playbackManager.seekTo(seekPosition);

        if (onSeek) {
          onSeek(seekPosition);
        }

        this.setState({ seekPercent });
      },
      onPanResponderRelease: () => {
        setTimeout(() => { // flicker fix to account for seek delay
          this.setState({ seekPercent: 0 });
        }, 1000);
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { containerWidth } = this.state;

    if (containerWidth && prevProps.track.id !== this.props.track.id) {
      this._adjustWaveform();
    }
  }

  _onScrubberLayout = ({ nativeEvent }) => {
    this.setState({
      containerXPosition: nativeEvent.layout.x + styles.container.marginLeft,
      containerWidth: nativeEvent.layout.width,
    }, this._adjustWaveform);
  }

  _adjustWaveform = () => {
    const { waveform } = this.props.track;
    const { containerWidth } = this.state;
    const displayedWaves = Math.floor(containerWidth / (waveWidth + waveSpace));
    const aggregatePerDisplayedWave = Math.ceil(waveform.length / displayedWaves);
    const adjustedWaveform = [];

    waveform.reduce((aggregate, wave, index) => {
      if (index > 0 && (index % aggregatePerDisplayedWave === 0 || index === waveform.length - 1)) {
        adjustedWaveform.push(Math.floor(aggregate / (aggregatePerDisplayedWave - 1)));

        return 0;
      }

      return aggregate + wave;
    });

    this.setState({ adjustedWaveform });
  }

  render() {
    const { track } = this.props;
    const { adjustedWaveform, seekPercent } = this.state;
    const { currentTrackId } = playbackManager.store;
    const progress = (track.id === currentTrackId) ? seekPercent || this.getProgress() : 0;

    return (
      <View
        {...this.panResponder.panHandlers}
        onLayout={this._onScrubberLayout}
        style={styles.container}
      >
        {adjustedWaveform.map((wave, index) => (
          <View
            key={index}
            style={[
              styles.wave,
              { height: `${Math.min(Math.abs(wave), 100)}%` },
              (index < Math.floor(adjustedWaveform.length * progress)) ? styles.pastWave : null,
            ]}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: interfaceHelper.deviceValue({ default: 30, xs: 30 }),
    justifyContent: 'space-between',
    marginLeft: 18,
  },
  pastWave: {
    backgroundColor: '#7D4CCF',
  },
  wave: {
    backgroundColor: '#D9DBE0',
    borderRadius: 3,
    width: waveWidth,
  },
});
