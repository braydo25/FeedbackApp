import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import maestro from '../maestro';

const { timeHelper } = maestro.helpers;

export default class TrackPlayerInfo extends ProgressComponent {
  render() {
    const { track, style } = this.props;
    const { position, duration } = this.state;

    return (
      <View style={[ styles.container, style ]}>
        {!!track.user.avatarUrl && (
          <Image
            source={{ uri: track.user.avatarUrl }}
            resizeMode={'contain'}
            style={styles.artistImage}
          />
        )}

        <View style={styles.details}>
          <View>
            <Text style={styles.nameText}>{track.name}</Text>
            <Text style={styles.artistText}>{track.user.name}</Text>
          </View>

          <View style={styles.timeGenreContainer}>
            <Text style={styles.timeText}>{timeHelper.secondsToTime(position)} <Text style={styles.timeTotalText}>/ {timeHelper.secondsToTime(duration || track.duration)}</Text></Text>

            <View style={styles.genreTextBox}>
              <Text style={styles.genreText}>{track.genre.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderRadius: 10,
    height: 40,
    marginRight: 16,
    width: 40,
  },
  artistText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 12,
  },
  genreTextBox: {
    alignItems: 'center',
    backgroundColor: '#7D4CCF',
    borderRadius: 4,
    marginTop: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  nameText: {
    color: '#021224',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  timeGenreContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
  timeTotalText: {
    color: '#B8BFC9',
  },
});
