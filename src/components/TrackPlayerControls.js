import React from 'react';
import { ProgressComponent } from 'react-native-track-player';
import { View, Text, StyleSheet } from 'react-native';
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
        <Text style={styles.timeText}>{timeHelper.secondsToTime(position)}</Text>

        <View style={styles.scrubberContainer}>
          {levels.map((level, index) => (
            <View
              key={index}
              style={[
                styles.level,
                { height: `${level}%` },
                (index <= Math.floor(levels.length * progress)) ? styles.pastLevel : null,
              ]}
            />
          ))}
        </View>

        <Text style={styles.timeText}>{timeHelper.secondsToTime(duration)}</Text>
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
    backgroundColor: '#BBBBBB',
    width: 2,
  },
  pastLevel: {
    backgroundColor: '#2363D2',
  },
  scrubberContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 35,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  timeText: {
    color: '#3E3E42',
    fontSize: 15,
  },
});
