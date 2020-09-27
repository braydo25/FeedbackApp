import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class GameTrackCardDescription extends Component {
  render() {
    const { track } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={{ url: track.user.avatarUrl }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <Text style={styles.artistText}>{track.user.name} Says...</Text>
        <Text style={styles.descriptionText}>{track.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderRadius: 15,
    height: 60,
    width: 60,
  },
  artistText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginTop: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    paddingHorizontal: 16,
  },
  descriptionText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
});
