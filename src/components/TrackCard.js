import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import Track from './Track';
import TrackComment from './TrackComment';
import maestro from '../maestro';

const { navigationHelper, interfaceHelper } = maestro.helpers;

export default class TrackCard extends Component {
  _onViewFeedbackPress = () => {
    navigationHelper.navigate('Track', {
      trackId: this.props.track.id,
    });
  }

  render() {
    const { track, style } = this.props;
    const { trackComments } = track;

    return (
      <Card style={style}>
        <Track showMetadata track={track} style={styles.track} />

        {trackComments?.length > 0 && (
          <View style={styles.commentsContainer}>
            <Text style={styles.recentCommentsText}>Recent Feedback</Text>

            <TrackComment
              trackComment={trackComments[0]}
              style={styles.trackComment}
            />

            {!!trackComments[1] && (
              <TrackComment
                trackComment={trackComments[1]}
                style={styles.trackComment}
              />
            )}

            <TouchableOpacity onPress={this._onViewFeedbackPress} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All Feedback</Text>
            </TouchableOpacity>

            <LinearGradient
              start={{ x: -0.4, y: -0.4 }}
              end={{ x: 2, y: 2 }}
              colors={[ '#FFFAFF', '#DED4DE' ]}
              style={styles.commentsBackgroundGradient}
            />
          </View>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  commentsBackgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  commentsContainer: {
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
  recentCommentsText: {
    alignSelf: 'flex-start',
    color: '#04112A',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    marginBottom: 8,
    marginLeft: 8,
  },
  track: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  trackComment: {
    marginBottom: 8,
  },
  viewMoreButton: {
    marginTop: 8,
  },
  viewMoreText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
  },
});
