import React, { Component } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, Text, TextInput, Alert, StyleSheet, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

export default class MainScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.innerContainer}>
          <View style={styles.card}>
            <View style={{ flex: 1 }} />

            <View style={styles.trackInfo}>
              <Image
                source={require('../data/pics/profile.png')}
                resizeMode={'contain'}
                style={styles.artistImage}
              />

              <View>
                <Text style={styles.trackNameText}>Cruise Control</Text>
                <Text style={styles.trackArtistText}>Instant Party!</Text>
              </View>
            </View>

            <View style={styles.playbackContainer}>
              <Text style={styles.playbackTimeText}>0:50</Text>

              <Slider
                minimumValue={0}
                maximumValue={180}
                minimumTrackTintColor={'#EC3063'}
                value={50}
                style={styles.playbackSlider}
              />

              <Text style={styles.playbackTimeText}>3:16</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/skip.png')}
                style={styles.actionImage}
              />
            </TouchableOpacity>

            <TextInput
              multiline
              placeholder={'Enter your feedback...'}
              style={styles.feedbackInput}
            />

            <TouchableOpacity onPress={() => {}} style={[ styles.actionButton, styles.sendButton ]}>
              <Image
                resizeMode={'contain'}
                source={require('../assets/images/eject.png')}
                style={styles.actionImage}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 40,
  },
  actionImage: {
    width: '50%',
  },
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
  artistImage: {
    borderRadius: 25,
    height: 45,
    marginRight: 8,
    width: 45,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flex: 1,
  },
  feedbackInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    marginHorizontal: 16,
    maxHeight: 100,
    minHeight: 40,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 32,
    paddingTop: 70, // offset for header
  },
  playbackContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  playbackSlider: {
    flex: 1,
    marginHorizontal: 16,
  },
  playbackTimeText: {
    color: '#3E3E42',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#EC3063',
  },
  trackArtistText: {
    color: '#6D7D8F',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 16,
  },
  trackInfo: {
    alignItems: 'center',
    borderTopColor: '#EBEBF2',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: 16,
  },
  trackNameText: {
    color: '#3E3E42',
    fontFamily: 'SFUIDisplay-Heavy',
    fontSize: 24,
  },
});
