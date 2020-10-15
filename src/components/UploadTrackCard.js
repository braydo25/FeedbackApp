import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import Card from './Card';
import maestro from '../maestro';

const { interfaceHelper, navigationHelper } = maestro.helpers;

export default class UploadTrackCard extends Component {
  _openUploadTrack = () => {
    navigationHelper.navigate('UploadTrackNavigator');
  }

  render() {
    return (
      <Card style={styles.container}>
        <View>
          <Text style={styles.titleText}>Upload Your First Track</Text>
          <View style={styles.notificationBubble} />
        </View>

        <Button onPress={this._openUploadTrack} style={styles.button}>Upload Audio File</Button>
        <Button onPress={this._openUploadTrack} style={styles.button}>Import From SoundCloud</Button>
        <Button onPress={this._openUploadTrack}>Import From YouTube</Button>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
  },
  container: {
    alignItems: 'center',
    padding: 32,
  },
  notificationBubble: {
    backgroundColor: '#FF0000',
    borderColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    height: 12,
    position: 'absolute',
    right: -12,
    top: -4,
    width: 12,
  },
  titleText: {
    color: '#04112A',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 18, xs: 16 }),
    marginBottom: 32,
  },
});
