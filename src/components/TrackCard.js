import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import Track from './Track';
import TrackComment from './TrackComment';
import maestro from '../maestro';

const { navigationHelper, interfaceHelper } = maestro.helpers;

export default class TrackCard extends Component {
  _viewTrack = () => {
    navigationHelper.navigate('Track', {
      trackId: this.props.track.id,
    });
  }

  render() {
    const { track, style } = this.props;
    const { trackComments } = track;

    return (
      <Card style={style}>
        <TouchableOpacity onPress={this._viewTrack}>
          <Track showMetadata track={track} style={styles.track} />
        </TouchableOpacity>

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

            <TouchableOpacity onPress={this._viewTrack} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All Feedback ({track.totalComments})</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  commentsContainer: {
    alignItems: 'center',
    backgroundColor: '#FBFBFC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: '#DBDBE1',
    borderTopWidth: 1,
    overflow: 'hidden',
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  recentCommentsText: {
    alignSelf: 'flex-start',
    color: '#04112A',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    marginBottom: 8,
  },
  track: {
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  trackComment: {
    marginBottom: 12,
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
