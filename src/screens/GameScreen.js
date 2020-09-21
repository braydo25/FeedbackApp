import React, { Component } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { GameTrackCard, GameTrackCardStack, GameActions } from '../components';

export default class GameScreen extends Component {
  textInput = null;

  componentDidMount() {
    setTimeout(() => {
//      this.textInput.focus();
    }, 500);
  }

  _renderCard = card => {
    return (
      <GameTrackCard />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.innerContainer}>
          <GameTrackCardStack
            data={[ 0, 1, 2, 3 ]}
            renderCard={this._renderCard}
          />

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
  swiper: {
    flex: 1,
  },
});
