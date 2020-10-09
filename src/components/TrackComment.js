import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { timeHelper } = maestro.helpers;
const { userManager } = maestro.managers;

export default class TrackComment extends Component {
  _onDeletePress = () => {
    const { onDelete } = this.props;

    Alert.alert('Are you sure?', 'Are you sure you want to delete this feedback?', [
      {
        text: 'Delete',
        onPress: onDelete,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }

  render () {
    const { trackComment, style } = this.props;
    const { id, user, text, time, createdAt } = trackComment;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ uri: user.avatarUrl }}
          resizeMode={'contain'}
          style={styles.avatarImage}
        />

        <View style={styles.textContainer}>
          <Text style={styles.commentText}>{text}</Text>
          <Text style={styles.timeText}>{user.name} at {timeHelper.secondsToTime(time)} | {timeHelper.fromNow(createdAt)}</Text>
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
  avatarImage: {
    borderRadius: 10,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  commentText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
    marginRight: 35,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#FFE2E2',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  deleteIcon: {
    height: '45%',
    opacity: 0.8,
    width: '45%',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#FAF4FA',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {
    color: '#B2B2B2',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
  },
});
