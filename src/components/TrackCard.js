import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import TrackComment from './TrackComment';
import TrackPlayerInfo from './TrackPlayerInfo';
import TrackPlayerControls from './TrackPlayerControls';

export default class TrackCard extends Component {
  render() {
    const { track, style } = this.props;
    const { trackComments } = track;

    return (
      <Card style={style}>
        <TrackPlayerInfo showMetadata track={track} style={styles.trackPlayerInfo} />
        <TrackPlayerControls track={track} style={styles.trackPlayerControls} />

        {trackComments?.length > 0 && (
          <View style={styles.commentsContainer}>
            <Text style={styles.recentCommentsText}>Recent Feedback</Text>

            <TrackComment
              text={'This is sick!!'}
              time={100}
              user={{ name: 'Alex', avatarUrl: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-1/p200x200/21557468_1467383330044397_4924280562104961001_n.jpg?_nc_cat=104&_nc_sid=dbb9e7&_nc_ohc=P7XOpbHNEbsAX-uYfzj&_nc_ht=scontent-sea1-1.xx&tp=6&oh=2f2142c60bdd2601021d82860e30bbee&oe=5F9B1EA6' }}
              style={styles.trackComment}
            />

            <TrackComment
              text={'This is sick!!'}
              time={100}
              user={{ name: 'Alex', avatarUrl: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-1/p200x200/21557468_1467383330044397_4924280562104961001_n.jpg?_nc_cat=104&_nc_sid=dbb9e7&_nc_ohc=P7XOpbHNEbsAX-uYfzj&_nc_ht=scontent-sea1-1.xx&tp=6&oh=2f2142c60bdd2601021d82860e30bbee&oe=5F9B1EA6' }}
              style={styles.trackComment}
            />

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View All Feedback (42)</Text>
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
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 8,
  },
  trackComment: {
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
