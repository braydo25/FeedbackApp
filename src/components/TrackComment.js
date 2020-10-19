import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Image from './Image';
import AvatarButton from './AvatarButton';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { timeHelper, interfaceHelper } = maestro.helpers;

export default class TrackComment extends Component {
  state = {
    liked: false,
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

  _onLikePress = () => {
    this.setState({ liked: !this.state.liked });
  }

  render () {
    const { trackComment, style } = this.props;
    const { liked } = this.state;
    const { id, user, text, time } = trackComment;
    const heartEmptyImage = require('../assets/images/heart-empty.png');
    const heartFullImage = require('../assets/images/heart-full.png');

    return (
      <View style={[ styles.container, style ]}>
        <AvatarButton
          user={user}
          style={styles.avatarButton}
        />

        <View style={styles.textContainer}>
          <Text style={styles.userText}><Text style={styles.nameText}>{user.name}</Text> at {timeHelper.secondsToTime(time)}</Text>
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
          <TouchableOpacity onPress={this._onLikePress} style={styles.likeButton}>
            <Image
              source={liked ? heartFullImage : heartEmptyImage}
              resizeMode={'contain'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        )}

        {!id && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        )}
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
    fontSize: interfaceHelper.deviceValue({ default: 13, xs: 12 }),
    lineHeight: 18,
    marginBottom: 1,
    marginRight: 35,
  },
  container: {
    flexDirection: 'row',
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
  likeButton: {
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
    fontSize: interfaceHelper.deviceValue({ default: 12, xs: 11 }),
  },
});
