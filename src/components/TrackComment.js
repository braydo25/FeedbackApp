import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AvatarButton from './AvatarButton';
import Image from './Image';
import TrackCommentLikeButton from './TrackCommentLikeButton';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { timeHelper, navigationHelper, interfaceHelper } = maestro.helpers;

export default class TrackComment extends Component {
  _openProfile = () => {
    const { user } = this.props.trackComment;

    navigationHelper.push('ProfileNavigator', {
      screen: 'Profile',
      params: { userId: user.id },
    });
  }

  _onDeletePress = () => {
    const { onDelete } = this.props;

    Alert.alert('Are you sure?', 'Are you sure you want to delete this feedback?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
      },
    ]);
  }

  render () {
    const { trackComment, contentBackground, style } = this.props;
    const { id, user, text, time } = trackComment;

    return (
      <View style={[ styles.container, style ]}>
        <AvatarButton
          user={user}
          style={styles.avatarButton}
        />

        <View style={[
          styles.contentContainer,
          (contentBackground) ? styles.contentContainerBackground : null,
        ]}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={this._openProfile}>
              <Text style={styles.userText}><Text style={styles.nameText}>{user.name}</Text> at {timeHelper.secondsToTime(time)}</Text>
            </TouchableOpacity>

            <Text style={styles.commentText}>{text}</Text>
          </View>

          {!!id && user.id === userManager.store.user.id && (
            <TouchableOpacity onPress={this._onDeletePress} style={styles.deleteButton}>
              <Image
                source={require('../assets/images/delete.png')}
                resizeMode={'contain'}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          )}

          {user.id !== userManager.store.user.id && (
            <TrackCommentLikeButton trackComment={trackComment} />
          )}

          {!id && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarButton: {
    borderRadius: 10,
    height: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
    marginRight: 10,
    width: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
  },
  commentText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    lineHeight: 18,
    marginBottom: 1,
    marginRight: 35,
  },
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainerBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFE2E2',
    borderRadius: 12,
    height: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
    justifyContent: 'center',
    width: interfaceHelper.deviceValue({ default: 35, xs: 30 }),
  },
  deleteIcon: {
    height: '45%',
    opacity: 0.8,
    width: '45%',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#FAF4FA',
    borderRadius: 12,
    height: 35,
    justifyContent: 'center',
    width: 35,
  },
  nameText: {
    color: '#000000',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userText: {
    color: '#B2B2B2',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 13, xs: 12 }),
  },
});
