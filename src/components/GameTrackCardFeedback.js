import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class GameTrackCardFeedback extends Component {
  render () {
    const { style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={require('../data/pics/profile.png')}
          resizeMode={'contain'}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.timeText}>2:02</Text>
          <Text style={styles.feedbackText}>Damn dude this goes hard the whole time! Definitely made it to the top 10 of my all time favorites!</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 2.20,
    width: 30,
  },
  deleteText: {
    color: '#3E3E42',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  feedbackText: {
    color: '#3E3E42',
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: 15,
    marginRight: 35,
  },
  image: {
    borderRadius: 20,
    height: 35,
    marginRight: 12,
    width: 35,
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    color: '#6D7D8F',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
});
