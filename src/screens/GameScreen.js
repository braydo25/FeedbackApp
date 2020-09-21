import React, { Component } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { GameTrackCardStack, GameActions } from '../components';

export default class GameScreen extends Component {
  textInput = null;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.innerContainer}>
          <GameTrackCardStack
            tracks={[ 0, 1, 2, 3 ]}
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
});
