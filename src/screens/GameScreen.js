import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { GameImageBackground, GameTrackCardStack, GameActions } from '../components';
import maestro from '../maestro';

const { gameManager, playbackManager } = maestro.managers;
const { appUpdatesHelper, interfaceHelper } = maestro.helpers;

const windowHeight = Dimensions.get('window').height;

export default class GameScreen extends PureComponent {
  state = {
    tracks: null,
    keyboardVerticalOffset: 0,
    loading: false,
  }

  componentDidMount() {
    maestro.link(this);

    this._loadTracks();
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ game }) {
    this.setState({ tracks: game.tracks });
  }

  async receiveEvent(name, value) {
    if (name === 'APP_STATE_CHANGED' && value === 'active') {
      appUpdatesHelper.promptToUpdate();
    }
  }

  _loadTracks = async () => {
    try {
      await gameManager.loadTracks();

      const currentTrack = gameManager.getCurrentTrack();

      if (currentTrack) {
        playbackManager.play(currentTrack);
      }
    } catch (error) {
      interfaceHelper.showError({ message: 'Failed to load tracks. Retrying...' });

      setTimeout(this._loadTracks, 2500);
    }
  }

  _onLayout = ({ nativeEvent }) => {
    this.setState({
      keyboardVerticalOffset: windowHeight - nativeEvent.layout.height,
    });
  }

  render() {
    const { tracks, keyboardVerticalOffset } = this.state;
    const { currentTrackIndex } = gameManager.store;

    return (
      <SafeAreaView onLayout={this._onLayout} style={styles.container}>
        <GameImageBackground />

        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.innerContainer}
        >
          {!!tracks && (
            <>
              <GameTrackCardStack tracks={tracks} />
              <GameActions disabled={tracks.length === currentTrackIndex} />
            </>
          )}

          {!tracks && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={'large'} color={'#FFFFFF'} />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 14,
    paddingHorizontal: 12,
    paddingTop: 68,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
