import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TrackCard from './TrackCard';

export default class TracksList extends Component {
  _renderTrackCard = ({ item, index }) => {
    return (
      <TrackCard track={item} style={styles.trackCard} />
    );
  }

  render() {
    const { tracks, style, ...props } = this.props;

    return (
      <FlatList
        data={tracks}
        renderItem={this._renderTrackCard}
        keyExtractor={item => `${item.id}`}
        style={[ styles.container, style ]}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trackCard: {
    marginBottom: 16,
  },
});
