import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import GameTrackCardDescription from './GameTrackCardDescription';
import GameTrackCardTip from './GameTrackCardTip';
import Track from './Track';
import TrackComment from './TrackComment';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;
const { gameManager } = maestro.managers;

export default class GameTrackCard extends Component {
  state = {
    comments: [],
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ game }) {
    const { track } = this.props;
    const currentTrack = gameManager.getCurrentTrack();

    if (currentTrack && track.id === currentTrack.id) {
      this.setState({ comments: game.currentTrackComments });
    }
  }

  receiveEvent(name, value) {
    if (name === 'GAME_COMMENT_CREATED') {
      this.setState({
        comments: [
          { comment: true, ...value },
          ...this.state.comments,
        ],
      });
    }
  }

  reset = () => {
    this.setState({ comments: [] });
  }

  _onDeleteComment = async trackComment => {
    try {
      await gameManager.deleteTrackComment({
        trackId: trackComment.trackId,
        trackCommentId: trackComment.id,
      });
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
    }
  }

  _renderItem = ({ item, index }) => {
    return (
      <TrackComment
        onDelete={() => this._onDeleteComment(item)}
        trackComment={item}
        style={(index > 0) ? styles.comment : null}
      />
    );
  }

  _renderEmptyComponent = () => {
    const { track, tip } = this.props;

    return (track.description) ? (
      <GameTrackCardDescription track={this.props.track} />
    ) : (
      <GameTrackCardTip tip={tip} />
    );
  }

  render() {
    const { track } = this.props;
    const { comments } = this.state;

    return (
      <Card style={styles.container}>
        <View style={styles.commentsContainer}>
          <FlatList
            inverted={comments?.length > 0}
            data={comments}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${index}`}
            keyboardShouldPersistTaps={'always'}
            ListEmptyComponent={this._renderEmptyComponent}
            contentContainerStyle={[
              styles.commentsListContentContainer,
              (comments.length === 0) ? styles.commentsListContentContainerEmpty : null,
            ]}
            style={styles.commentsList}
          />

          <View styles={styles.commentsBackgroundGradient}>
            <LinearGradient
              start={{ x: -0.4, y: -0.4 }}
              end={{ x: 2, y: 2 }}
              colors={[ '#FFFAFF', '#DED4DE' ]}
              style={styles.commentsBackgroundGradient}
            />
          </View>
        </View>

        <Track track={track} style={styles.track} />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  comment: {
    marginBottom: 8,
  },
  commentsBackgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  commentsContainer: {
    backgroundColor: '#F1EAF1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
  commentsListContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  commentsListContentContainerEmpty: {
    paddingVertical: 0,
  },
  container: {
    flex: 1,
  },
  track: {
    borderTopColor: '#E3E3E9',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: interfaceHelper.deviceValue({ default: 16, xs: 12 }),
  },
});
