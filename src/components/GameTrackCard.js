import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import GameTrackCardFeedback from './GameTrackCardFeedback';
import TrackPlayerControls from './TrackPlayerControls';
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
        feedback={item.feedback}
        time={`0:${item.time.toString().padStart(2, '0')}`}
        style={(index > 0) ? styles.feedback : null}
      />
    );
  }

  render() {
    const { track } = this.props;
    const { feedback } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={feedback}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${index}`}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.feedbackContentContainer}
          style={styles.feedbackList}
        />

        <View style={styles.details}>
          <Image
            source={{ uri: track.user.avatarAttachment.url }}
            resizeMode={'contain'}
            style={styles.artistImage}
          />

          <View>
            <Text style={styles.nameText}>{track.name}</Text>
            <Text style={styles.artistText}>{track.user.name}</Text>
          </View>
        </View>

        <TrackPlayerControls style={styles.trackPlayerControls} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderRadius: 25,
    height: 45,
    marginRight: 8,
    width: 45,
  },
  artistText: {
    color: '#6D7D8F',
    //fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  details: {
    alignItems: 'center',
    borderTopColor: '#EBEBF2',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingTop: 16,
  },
  feedback: {
    borderBottomColor: '#EBEBF2',
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  feedbackContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  feedbackList: {
    flex: 1,
  },
  nameText: {
    color: '#3E3E42',
    //fontFamily: 'SFUIDisplay-Heavy',
    fontSize: 24,
  },
  trackPlayerControls: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
});
