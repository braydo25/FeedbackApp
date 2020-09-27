import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        {...item}
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
            data={feedback}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${index}`}
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={styles.feedbackListContentContainer}
            style={styles.feedbackList}
          />

          <LinearGradient
            start={{ x: -0.4, y: -0.4 }}
            end={{ x: 2, y: 2 }}
            colors={[ '#FFFAFF', '#DED4DE' ]}
            style={styles.feedbackBackgroundGradient}
          />
        </View>

        <TrackPlayerInfo track={track} style={styles.trackPlayerInfo} />
        <TrackPlayerControls track={track} style={styles.trackPlayerControls} />
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
  feedbackBackgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  feedbackContainer: {
    backgroundColor: '#F1EAF1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    overflow: 'hidden',
  },
  feedbackList: {
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
