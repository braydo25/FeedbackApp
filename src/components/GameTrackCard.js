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
  flatlist = null;

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

  reset = () => {
    this.flatlist.scrollToOffset({ offset: 0 });
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

  _renderFooterComponent = () => {
    const { track, tip } = this.props;

    return (track.description) ? (
      <GameTrackCardDescription track={this.props.track} />
    ) : (
      <GameTrackCardTip tip={tip} />
    );
  }

  render() {
    const { track } = this.props;

    return (
      <Card style={styles.container}>
        <View style={styles.commentsContainer}>
          <FlatList
            inverted
            data={track.trackComments}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${index}`}
            keyboardShouldPersistTaps={'always'}
            ListFooterComponent={this._renderFooterComponent}
            contentContainerStyle={[
              styles.commentsListContentContainer,
              (track.trackComments?.length === 0) ? styles.commentsListContentContainerEmpty : null,
            ]}
            ref={component => this.flatlist = component}
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
    marginBottom: 12,
  },
  commentsBackgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  commentsContainer: {
    backgroundColor: '#FBFBFC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
  commentsListContentContainer: {
    flexGrow: 1,
    padding: 12,
  },
  commentsListContentContainerEmpty: {
    paddingVertical: 0,
  },
  container: {
    flex: 1,
  },
  track: {
    borderTopColor: '#DBDBE1',
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
