import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AvatarButton from './AvatarButton';
import Card from './Card';
import Image from './Image';
import TrackCommentLikeButton from './TrackCommentLikeButton';
import maestro from '../maestro';

const { navigationHelper, timeHelper, interfaceHelper } = maestro.helpers;

export default class Notification extends Component {
  _getData = () => {
    const { notification } = this.props;
    const { trackComment, trackCommentLike } = notification;
    const user = trackComment?.user || trackCommentLike?.user;

    if (trackComment) {
      return {
        type: 'comment',
        trackId: trackComment.trackId,
        titleText: `on ${trackComment.track.name}`,
        contentText: trackComment.text,
        timeText: `Track Time ${timeHelper.secondsToTime(trackComment.time)} | ${timeHelper.fromNow(notification.createdAt)}`,
        trackComment,
        user,
      };
    }

    if (trackCommentLike) {
      return {
        type: 'like',
        trackId: trackCommentLike.trackComment.track.id,
        titleText: `liked your feedback on ${trackCommentLike.trackComment.track.name}.`,
        contentText: `"${trackCommentLike.trackComment.text}" - You`,
        timeText: timeHelper.fromNow(notification.createdAt),
        user,
      };
    }
  }

  render() {
    const data = this._getData();
    const { trackId, type, titleText, contentText, timeText, trackComment, user } = data;
    const commentImage = require('../assets/images/comment.png');
    const heartImage = require('../assets/images/heart-white.png');

    return (
      <TouchableOpacity onPress={() => navigationHelper.navigate('Track', { trackId })} style={styles.container}>
        <View style={styles.avatarContainer}>
          <AvatarButton
            user={user}
            style={styles.avatarButton}
          />

          {type === 'comment' && (
            <View style={[ styles.typeIconContainer, styles.commentIconContainer ]}>
              <Image source={commentImage} style={styles.typeIcon} />
            </View>
          )}

          {type === 'like' && (
            <View style={[ styles.typeIconContainer, styles.likeIconContainer ]}>
              <Image source={heartImage} style={styles.typeIcon} />
            </View>
          )}
        </View>

        <Card style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.titleNameText}>{user.name}</Text> {titleText}
            </Text>

            <Text style={styles.contentText}>{contentText}</Text>
            <Text style={styles.timeText}>{timeText}</Text>
          </View>

          {!!trackComment && (
            <TrackCommentLikeButton trackComment={trackComment} />
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  avatarButton: {
    borderRadius: 10,
    height: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
    marginTop: 4,
    width: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
  },
  avatarContainer: {
    marginRight: 16,
  },
  card: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 'auto',
  },
  commentIconContainer: {
    backgroundColor: '#7C4BCE',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 16,
  },
  contentText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    marginBottom: 6,
  },
  likeIconContainer: {
    backgroundColor: '#EC3063',
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    color: '#8A8A8A',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 12, xs: 11 }),
  },
  titleNameText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
  },
  titleText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    marginBottom: 4,
  },
  typeIcon: {
    height: 7,
    width: 7,
  },
  typeIconContainer: {
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 2,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: -6,
    top: 0,
    width: 16,
  },
});
