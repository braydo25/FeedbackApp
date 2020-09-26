import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import maestro from '../maestro';

const { timeHelper } = maestro.helpers;

const levels = [
  12,
  25,
  27,
  40,
  50,
  70,
  75,
  73,
  68,
  63,
  29,
  27,
  26,
  81,
  72,
  82,
  73,
  75,
  74,
  72,
  75,
  25,
  13,
  12,
  25,
  27,
  40,
  50,
  70,
  75,
  73,
  68,
  100,
  100,
  100,
  63,
  29,
  27,
  26,
  81,
  72,
  82,
  73,
  75,
  74,
  72,
  75,
  25,
  13,
];

export default class GameTrackScrubber extends ProgressComponent {
  render() {
    const { style } = this.props;
    const { position, duration } = this.state;
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

        <View style={styles.scrubberContainer}>
          {levels.map((level, index) => (
            <View
              key={index}
              style={[
                styles.level,
                { height: `${level}%` },
                (index <= Math.floor(levels.length * 0.4)) ? styles.pastLevel : null,
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
  level: {
    backgroundColor: '#EAECF1',
    borderRadius: 3,
    width: 3,
  },
  pastLevel: {
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
});
