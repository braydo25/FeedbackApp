import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';

export default class Notification extends Component {
  render() {
    return (
      <Card style={styles.container}>
        <View style={styles.leftImageContainer}>
          <Image
            source={{ url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0f28fe98-62ec-4e7e-8a7c-827b59f1d350-profile_image-70x70.jpg' }}
            style={styles.leftImage}
          />

          <View style={styles.commentIconContainer}>
            <Image source={require('../assets/images/comment.png')} style={styles.commentIcon} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.titleNameText}>Nick Mira</Text> on "Lemonade"
          </Text>

          <Text style={styles.contentText}>Really really digging what you did with this it sounds super duper good like omg.</Text>
          <Text style={styles.timeText}>5m</Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
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
    borderColor: '#D8CCD6',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  contentText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    marginBottom: 4,
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
    fontSize: 14,
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
