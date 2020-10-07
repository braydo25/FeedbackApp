import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from './Button';
import Card from './Card';
import maestro from '../maestro';

const { gameManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

export default class GameNoTracksCard extends Component {
  state = {
    loading: false,
  }

  _loadTracks = async () => {
    this.setState({ loading: true });

    await (new Promise(resolve => {
      setTimeout(resolve, 3000);
    }));

    try {
      const newTracks = await gameManager.loadTracks();

      if (newTracks.length) {
        maestro.dispatchEvent('GAME_ANIMATING_NEXT_TRACK');
      }
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <Card style={styles.container}>
        <Text style={styles.titleText}>That's All For Now!</Text>
        <Text style={styles.infoText}>Come back later for a new set of tracks to give feedback on!</Text>

        <Button
          onPress={this._loadTracks}
          loading={loading}
          small
        >
          Check For New Tracks
        </Button>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  infoText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  titleText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
});
