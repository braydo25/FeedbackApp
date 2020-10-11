import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TrackPlayerInfo from './TrackPlayerInfo';
import TrackPlayerControls from './TrackPlayerControls';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default class Track extends Component {
  trackPlayerInfo = null;
  trackPlayerControls = null;

  render() {
    const { showMetadata, track, style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <TrackPlayerInfo
          track={track}
          showMetadata={showMetadata}
          ref={component => this.trackPlayerInfo = component}
        />

        <TrackPlayerControls
          onSeek={position => this.trackPlayerInfo.setPosition(position)}
          track={track}
          style={styles.trackPlayerControls}
          ref={component => this.trackPlayerControls = component}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  trackPlayerControls: {
    paddingTop: interfaceHelper.deviceValue({ default: 16, xs: 12 }),
  },
});
