import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import Image from './Image';
import maestro from '../maestro';

const { navigationHelper, timeHelper } = maestro.helpers;

export default class Notification extends Component {
  render() {
    const { notification } = this.props;
    const { trackComment } = notification;
    const { user, track } = trackComment;

    return (
      <TouchableOpacity onPress={() => navigationHelper.navigate('Track', { trackId: trackComment.trackId })} style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.leftImageContainer}>
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.leftImage}
            />

            <View style={styles.commentIconContainer}>
              <Image source={require('../assets/images/comment.png')} style={styles.commentIcon} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.titleNameText}>{user.name}</Text> on {track.name}
            </Text>

            <Text style={styles.contentText}>{trackComment.text}</Text>
            <Text style={styles.timeText}>Track Time {timeHelper.secondsToTime(trackComment.time)} | {timeHelper.fromNow(notification.createdAt)} ago</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
  },
  commentIcon: {
    height: 7,
    width: 7,
  },
  commentIconContainer: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 2,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: -6,
    top: -4,
    width: 16,
  },
  container: {
    marginBottom: 16,
    width: '100%',
  },
  contentText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    marginBottom: 6,
  },
  leftImage: {
    borderRadius: 10,
    height: 40,
    width: 40,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  timeText: {
    color: '#8A8A8A',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 12,
  },
  titleNameText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
  },
  titleText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    marginBottom: 4,
  },
});
