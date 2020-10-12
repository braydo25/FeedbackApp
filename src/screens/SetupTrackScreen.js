import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Image } from '../components';
import maestro from '../maestro';

const { userManager, tracksManager } = maestro.managers;
const { navigationHelper, interfaceHelper } = maestro.helpers;

export default class SetupTrackScreen extends Component {
  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ tracks }) {
    if (tracks.tracks?.length) {
      for (let i = 0; i < tracks.tracks.length; i++) {
        const currentTrack = tracks.tracks[i];

        if (currentTrack.name && currentTrack.genre) {
          return this._next();
        }
      }
    }
  }

  _addTrack = () => {
    navigationHelper.navigate('UploadTrackNavigator');
  }

  _next = () => {
    navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
  }

  _deferSetup = () => {
    tracksManager.deferSetup();
    this._next();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require('../assets/images/music-file-white.png')}
            style={styles.fileImage}
          />

          <Text style={styles.titleText}>Add your first track</Text>
          <Text style={styles.infoText}>Import a track from your SoundCloud or YouTube channel, or upload an audio file.</Text>
        </View>

        <View style={styles.formContainer}>
          <Card style={styles.formCard}>
            <Button onPress={this._addTrack}>Add Track</Button>

            <TouchableOpacity onPress={this._deferSetup} style={styles.notNowButton}>
              <Text style={styles.notNowButtonText}>I'll do this later</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <Image
          source={require('../assets/images/landing-background.png')}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.topContainerBackgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileImage: {
    height: interfaceHelper.deviceValue({ default: 150, xs: 110 }),
    width: interfaceHelper.deviceValue({ default: 120, xs: 88 }),
    zIndex: 1,
  },
  formCard: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
    letterSpacing: 0.4,
    lineHeight: interfaceHelper.deviceValue({ default: 22, xs: 19 }),
    marginBottom: 16,
    textAlign: 'center',
  },
  notNowButton: {
    alignItems: 'center',
    marginTop: interfaceHelper.deviceValue({ default: 16, xs: 12 }),
    padding: interfaceHelper.deviceValue({ default: 16, xs: 12 }),
    width: '100%',
  },
  notNowButtonText: {
    color: '#AAAAAA',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 24, xs: 21 }),
    marginBottom: 8,
    marginTop: interfaceHelper.deviceValue({ default: 32, xs: 28 }),
    textAlign: 'center',
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  topContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.75,
    zIndex: -1,
  },
});
