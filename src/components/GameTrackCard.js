import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { GameTrackCardFeedback } from './';
import Slider from '@react-native-community/slider';

export default class GameTrackCard extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <GameTrackCardFeedback style={(index > 0) ? styles.feedback : null} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={[ 0, 1, 2, 3 ]}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${index}`}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.feedbackContentContainer}
          style={styles.feedbackList}
        />

        <View style={styles.details}>
          <Image
            source={require('../data/pics/profile2.png')}
            resizeMode={'contain'}
            style={styles.artistImage}
          />

          <View>
            <Text style={styles.nameText}>Cruise Control</Text>
            <Text style={styles.artistText}>Instant Party!</Text>
          </View>
        </View>

        <View style={styles.playbackContainer}>
          <Text style={styles.playbackTimeText}>0:50</Text>

          <Slider
            minimumValue={0}
            maximumValue={180}
            minimumTrackTintColor={'#EC3063'}
            value={50}
            style={styles.playbackSlider}
          />

          <Text style={styles.playbackTimeText}>3:16</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderRadius: 25,
    height: 45,
    marginRight: 8,
    width: 45,
  },
  artistText: {
    color: '#6D7D8F',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  details: {
    alignItems: 'center',
    borderTopColor: '#EBEBF2',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingTop: 16,
  },
  feedback: {
    borderBottomColor: '#EBEBF2',
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  feedbackContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  feedbackList: {
    flex: 1,
  },
  nameText: {
    color: '#3E3E42',
    fontFamily: 'SFUIDisplay-Heavy',
    fontSize: 24,
  },
  playbackContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  playbackSlider: {
    flex: 1,
    marginHorizontal: 16,
  },
  playbackTimeText: {
    color: '#3E3E42',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 15,
  },
});
