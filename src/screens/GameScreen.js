import React, { Component } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { GameTrackCardStack, GameActions } from '../components';
import maestro from '../maestro';

const { gameManager, playbackManager } = maestro.managers;

export default class GameScreen extends Component {
  state = {
    tracks: null,
  }

  componentDidMount() {
    maestro.link(this);

    this._loadTracks();
  }

  receiveStoreUpdate({ game }) {
    this.setState({ tracks: game.tracks });
  }

  _loadTracks = async () => {
    await gameManager.loadTracks();

    playbackManager.play();
  }

  render() {
    const { tracks } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.innerContainer}>
          <GameTrackCardStack tracks={tracks} />
          <GameActions />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 32,
    paddingTop: 70, // offset for header
  },
});
