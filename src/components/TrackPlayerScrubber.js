import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import maestro from '../maestro';

const waveWidth = 2;
const waveSpace = 1;

const { playbackManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

export default class TrackPlayerScrubber extends ProgressComponent {
  state = {
    adjustedWaveform: [],
    containerWidth: 0,
  }

  componentDidUpdate(prevProps) {
    const { containerWidth } = this.state;

    if (containerWidth && prevProps.track.id !== this.props.track.id) {
      this._adjustWaveform();
    }
  }

  _onScrubberLayout = ({ nativeEvent }) => {
    this.setState({ containerWidth: nativeEvent.layout.width }, this._adjustWaveform);
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
    const { adjustedWaveform } = this.state;
    const { currentTrackId } = playbackManager.store;
    const progress = (track.id === currentTrackId) ? this.getProgress() : 0;

    return (
      <View onLayout={this._onScrubberLayout} style={styles.container}>
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
