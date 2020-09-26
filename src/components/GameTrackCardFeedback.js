import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class GameTrackCardFeedback extends Component {
  render () {
    const { feedback, time, style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={require('../data/pics/profile.png')}
          resizeMode={'contain'}
          style={styles.avatarImage}
        />

        <View style={styles.textContainer}>
          <Text style={styles.feedbackText}>This is super sick! Love it! This is another test about things and stuff</Text>
          <Text style={styles.timeText}>Track Time: 0:58</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton}>
          <Image
            source={require('../assets/images/delete.png')}
            resizeMode={'contain'}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 10,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 6,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFE2E2',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  deleteIcon: {
    opacity: 0.8,
    width: '35%',
  },
  feedbackText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    lineHeight: 18,
    marginRight: 35,
    marginBottom: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {
    color: '#B8BFC9',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
  },
});
