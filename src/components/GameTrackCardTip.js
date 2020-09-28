import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GameTrackCardTip extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Here's a tip...</Text>
        <Text style={styles.tipText}>If your feedback is marked as useful by the artist, you'll get a major EXP boost!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: '100%',
    paddingHorizontal: 8,
  },
  tipText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  titleText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
  },
});
