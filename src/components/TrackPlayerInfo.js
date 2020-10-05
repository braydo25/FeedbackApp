import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import maestro from '../maestro';

const { playbackManager, userManager } = maestro.managers;
const { timeHelper } = maestro.helpers;

export default class TrackPlayerInfo extends ProgressComponent {
  render() {
    const { track, showMetadata, style } = this.props;
    const { currentTrackId } = playbackManager.store;
    const { user } = userManager.store;
    const position = (track.id === currentTrackId) ? this.state.position : 0;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ uri: (track.userId !== user.id) ? track.user.avatarUrl : user.avatarUrl }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <View style={styles.details}>
          <View style={styles.detailsLeftContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.nameText}
            >
              {track.name}
            </Text>

            {!showMetadata && (
              <Text style={styles.artistText}>{track.user.name}</Text>
            )}

            {showMetadata && (
              <View style={styles.metadataContainer}>
                <Image source={require('../assets/images/play-gray.png')} style={styles.metadataPlayIcon} />
                <Text style={styles.metadataText}>0</Text>

                <Image source={require('../assets/images/comment-gray.png')} style={styles.metadataCommentsIcon} />
                <Text style={styles.metadataText}>0</Text>
              </View>
            )}
          </View>

          <View style={styles.detailsRightContainer}>
            <Text style={styles.timeText}>
              <Text style={styles.timeCurrentText}>{timeHelper.secondsToTime(position)} </Text>
              / {track.duration ? timeHelper.secondsToTime(track.duration) : '0:00'}
            </Text>

            {!!track.genre && (
              <View style={styles.genreTextBox}>
                <Text style={styles.genreText}>{(track.genre) ? track.genre.name : 'No Genre'}</Text>
              </View>
            )}
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
  detailsLeftContainer: {
    flex: 1,
  },
  detailsRightContainer: {
    alignItems: 'flex-end',
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
  metadataCommentsIcon: {
    height: 10,
    marginRight: 4,
    width: 10,
  },
  metadataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  metadataPlayIcon: {
    height: 10,
    marginRight: 4,
    width: 8,
  },
  metadataText: {
    color: '#B8BFC9',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
    marginRight: 12,
  },
  nameText: {
    color: '#021224',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginBottom: 2,
    marginRight: 5,
  },
  timeCurrentText: {
    color: '#7D4CCF',
  },
  timeText: {
    color: '#B8BFC9',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
    textAlign: 'right',
  },
});
