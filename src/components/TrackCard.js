import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TrackFeedback from './TrackFeedback';
import TrackPlayerInfo from './TrackPlayerInfo';
import TrackPlayerControls from './TrackPlayerControls';

const tempWaveform = [7,6,56,55,21,21,88,88,88,92,19,18,30,31,86,89,88,89,36,33,82,85,59,69,77,78,98,97,93,96,95,98,100,99,100,96,98,100,100,99,100,100,100,100,100,100,100,100,99,100,100,98,96,98,100,100,100,100,100,100,99,100,100,100,96,100,98,100,96,98,100,100,96,97,97,97,99,100,96,97,98,100,81,77,81,85,95,96,95,96,95,96,96,96,96,96,98,100,94,95,96,96,93,94,96,96,99,100,96,96,96,98,97,99,97,98,96,96,96,96,100,100,94,100,96,99,99,100,96,100,100,100,98,100,99,98,100,100,97,97,100,100,98,99,100,100,98,100,97,97,100,99,98,97,96,96,96,98,100,97,96,96,96,96,97,98,99,95,99,97,100,100,98,97,97,96,96,97,100,99,98,99,96,98,97,96,80,80,97,98,97,98,100,98,98,98,98,98,99,97,99,98,97,98,72,68,96,97,97,97,65,66,94,95,94,95,68,70,96,97,97,98,66,69,96,96,96,96,61,59,12,12,2,2];

export default class TrackCard extends Component {
  render() {
    const { style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <TrackPlayerInfo track={{ name: 'Chamberlain Hotel', user: { name: 'Moodoid', avatarUrl: 'https://i1.sndcdn.com/avatars-s3HB5DUwmalQzzwL-n2iDNQ-t500x500.jpg' }, genre: { name: 'EDM' }, duration: 200 }} style={styles.trackPlayerInfo} />
        <TrackPlayerControls track={{ waveform: tempWaveform }} style={styles.trackPlayerControls} />

        <View style={styles.feedbackContainer}>
          <Text style={styles.recentFeedbackText}>Recent Feedback</Text>

          <TrackFeedback
            text={'This is sick!!'}
            time={100}
            style={styles.trackFeedback}
          />

          <TrackFeedback
            text={'This is sick!!'}
            time={100}
            style={styles.trackFeedback}
          />

          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View All Feedback (42)</Text>
          </TouchableOpacity>

          <LinearGradient
            start={{ x: -0.4, y: -0.4 }}
            end={{ x: 2, y: 2 }}
            colors={[ '#FFFAFF', '#DED4DE' ]}
            style={styles.feedbackBackgroundGradient}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  feedbackBackgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  feedbackContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: '#D8CCD6',
    borderTopWidth: 1,
    overflow: 'hidden',
    paddingBottom: 16,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  recentFeedbackText: {
    alignSelf: 'flex-start',
    color: '#04112A',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 8,
  },
  trackFeedback: {
    marginBottom: 8,
  },
  trackPlayerControls: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  trackPlayerInfo: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  viewMoreButton: {
    marginTop: 8,
  },
  viewMoreText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
});
