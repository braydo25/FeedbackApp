import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;
const { tracksManager } = maestro.managers;

export default class TrackCommentLikeButton extends Component {
  state = {
    authUserTrackCommentLike: this.props.trackComment.authUserTrackCommentLike,
    loading: false,
  }

  _onPress = async () => {
    const { trackComment } = this.props;
    const { authUserTrackCommentLike } = this.state;

    this.setState({ loading: true });

    try {
      const result = (!authUserTrackCommentLike)
        ? await tracksManager.createTrackCommentLike({
          trackId: trackComment.trackId,
          trackCommentId: trackComment.id,
        })
        : await tracksManager.deleteTrackCommentLike({
          trackId: trackComment.trackId,
          trackCommentId: trackComment.id,
          trackCommentLikeId: authUserTrackCommentLike.id,
        });

      this.setState({ authUserTrackCommentLike: result });
    } catch (error) { /* noop */ }

    this.setState({ loading: false });
  }

  render() {
    const { style } = this.props;
    const { authUserTrackCommentLike, loading } = this.state;
    const heartEmptyImage = require('../assets/images/heart-empty.png');
    const heartFullImage = require('../assets/images/heart-full.png');

    return (
      <TouchableOpacity onPress={this._onPress} disabled={loading} style={[ styles.container, style ]}>
        {!loading && (
          <Image
            source={authUserTrackCommentLike ? heartFullImage : heartEmptyImage}
            resizeMode={'contain'}
            style={styles.likeIcon}
          />
        )}

        {loading && (
          <ActivityIndicator color={'#000000'} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    height: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
    justifyContent: 'center',
    width: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
  },
  likeIcon: {
    height: '55%',
    width: '55%',
  },
});
