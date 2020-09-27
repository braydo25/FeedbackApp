import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';

const waveWidth = 3;
const waveSpace = 1;

export default class TrackPlayerControls extends ProgressComponent {
  state = {
    adjustedWaveform: [],
  }

  _onScrubberLayout = ({ nativeEvent }) => {
    const { waveform } = this.props.track;
    const displayedWaves = Math.floor(waveform.length / (waveWidth + waveSpace));
    const aggregatePerDisplayedWave = Math.floor(waveform.length / displayedWaves);
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
    const { style } = this.props;
    const { adjustedWaveform } = this.state;
    const progress = this.getProgress();

    return (
      <View style={[ styles.container, style ]}>
        <TouchableOpacity style={styles.playPauseButton}>
          <Image
            source={require('../assets/images/pause.png')}
            resizeMode={'contain'}
            style={styles.playPauseIcon}
          />
        </TouchableOpacity>

        <View onLayout={this._onScrubberLayout} style={styles.scrubberContainer}>
          {adjustedWaveform.map((wave, index) => (
            <View
              key={index}
              style={[
                styles.wave,
                { height: `${Math.abs(wave)}%` },
                (index < Math.floor(adjustedWaveform.length * progress)) ? styles.pastWave : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pastWave: {
    backgroundColor: '#7D4CCF',
  },
  playPauseButton: {
    alignItems: 'center',
    backgroundColor: '#7D4CCF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  playPauseIcon: {
    width: '30%',
  },
  scrubberContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    marginLeft: 18,
  },
  wave: {
    backgroundColor: '#EAECF1',
    borderRadius: 3,
    width: waveWidth,
  },
});
