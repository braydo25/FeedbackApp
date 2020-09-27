import React, { Component } from 'react';
import { KeyboardAvoidingView, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native';
import { GameTrackCardStack, GameActions } from '../components';
import maestro from '../maestro';

const { gameManager, playbackManager } = maestro.managers;

const windowHeight = Dimensions.get('window').height;

export default class GameScreen extends Component {
  state = {
    tracks: null,
    keyboardVerticalOffset: 0,
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

  //  playbackManager.play();
  }

  _onLayout = ({ nativeEvent }) => {
    this.setState({
      keyboardVerticalOffset: windowHeight - nativeEvent.layout.height,
    });
  }

  render() {
    const { tracks, keyboardVerticalOffset } = this.state;
    const currentTrack = gameManager.getCurrentTrack();

    return (
      <SafeAreaView onLayout={this._onLayout} style={styles.container}>
        <Image
          source={{ uri: currentTrack?.user?.avatarUrl }}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.backgroundImage}
        />

        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.innerContainer}
        >
          <GameTrackCardStack tracks={tracks} />
          <GameActions />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: 70,
  },
});
