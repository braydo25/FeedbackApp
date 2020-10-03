import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from './Button';
import Card from './Card';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;

export default class UploadTrackCard extends Component {
  _openUploadTrack = () => {
    navigationHelper.navigate('UploadTrackNavigator');
  }

  render() {
    return (
      <Card style={styles.container}>
        <Text style={styles.titleText}>Upload Your First Track</Text>

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
  titleText: {
    color: '#04112A',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 18,
    marginBottom: 32,
  },
});
