import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import GameTrackCardFeedback from './GameTrackCardFeedback';
import TrackPlayerControls from './TrackPlayerControls';
import TrackPlayerInfo from './TrackPlayerInfo';
import maestro from '../maestro';

const { gameManager } = maestro.managers;
const { timeHelper } = maestro.helpers;

export default class GameTrackCard extends Component {
  state = {
    feedback: [],
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ game }) {

  }

  reset = () => {
    this.setState({
      feedback: [],
    });
  }

  _renderItem = ({ item, index }) => {
    return (
      <GameTrackCardFeedback
        style={(index > 0) ? styles.feedback : null}
      />
    );
  }

  render() {
    const { track } = this.props;
    const { feedback } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.feedbackContainer}>
          <FlatList
            inverted
            data={[]}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${index}`}
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={styles.feedbackListContentContainer}
            style={styles.feedbackList}
          />
        </View>

        <TrackPlayerInfo style={styles.trackPlayerInfo} />
        <TrackPlayerControls style={styles.trackPlayerControls} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 4,
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  feedback: {
    marginBottom: 8,
  },
  feedbackContainer: {
    backgroundColor: '#F1EAF1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  feedbackList: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  feedbackListContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  trackPlayerControls: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  trackPlayerInfo: {
    borderTopColor: '#E3E3E9',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
