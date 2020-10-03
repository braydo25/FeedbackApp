import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GameTrackCardDescription extends Component {
  render() {
    const { track } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.artistText}>{track.user.name} Says...</Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>{track.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
    minHeight: '100%',
    paddingHorizontal: 8,
  },
  descriptionText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
