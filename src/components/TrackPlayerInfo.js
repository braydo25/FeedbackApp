import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';

export default class TrackPlayerInfo extends ProgressComponent {
  render() {
    const { style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ uri: 'https://i1.sndcdn.com/avatars-yP66anDdEEZwyyNX-XkxQvw-t500x500.jpg' }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <View style={styles.details}>
          <View>
            <Text style={styles.nameText}>All I Need</Text>
            <Text style={styles.artistText}>Slushii</Text>
          </View>

          <View style={styles.timeGenreContainer}>
            <Text style={styles.timeText}>0:58 <Text style={styles.timeTotalText}>/ 4:02</Text></Text>

            <View style={styles.genreTextBox}>
              <Text style={styles.genreText}>EDM</Text>
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
    borderRadius: 2,
    marginTop: 3,
    paddingHorizontal: 3,
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
