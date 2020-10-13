import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Image, TrackComment, TrackPlayerControls, TrackPlayerInfo } from '../components';
import maestro from '../maestro';

const { tracksManager } = maestro.managers;

export default class TrackScreen extends Component {
  state = {
    track: null,
    trackComments: null,
  }

  async componentDidMount() {
    const { trackId } = this.props.route.params;

    this.setState({ track: await tracksManager.getTrack(trackId) });
    this.setState({ trackComments: await tracksManager.getTrackComments(trackId) });
  }

  _renderItem = ({ item, index }) => {
    return (
      <TrackComment trackComment={item} style={styles.trackComment} />
    );
  }

  render() {
    const { track, trackComments } = this.state;

    return (
      <View style={styles.container}>
        {!track && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'#000000'} size={'large'} />
          </View>
        )}

        {!!track && (
          <>
            <FlatList
              data={trackComments}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => `${item.id}`}
              contentContainerStyle={styles.commentsListContainer}
              style={styles.commentsList}
            />

            <View style={styles.trackContainer}>
              <TrackPlayerInfo showMetadata track={track} style={styles.trackPlayerInfo} />
              <TrackPlayerControls track={track} />
            </View>

            <Image
              source={{ uri: track.user.avatarUrl }}
              resizeMode={'cover'}
              blurRadius={39}
              style={styles.backgroundImage}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.5,
    width: '100%',
    zIndex: -1,
  },
  commentsList: {
    flex: 1,
  },
  commentsListContainer: {
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  trackComment: {
    marginBottom: 8,
  },
  trackContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  trackPlayerInfo: {
    marginBottom: 16,
  },
});
