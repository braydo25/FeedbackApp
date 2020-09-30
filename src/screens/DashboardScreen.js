import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { ProfileCard, TrackCard } from '../components';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;
const { userManager } = maestro.managers;

export default class DashboardScreen extends Component {
  state = {
    tracks: null,
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      rightButtonComponent: this._renderUploadTrackButton(),
    });
  }

  _renderUploadTrackButton = () => {
    return (
      <TouchableOpacity onPress={() => navigationHelper.navigate('UploadTrackNavigator')} style={styles.uploadTrackButton}>
        <Image
          source={require('../assets/images/plus.png')}
          resizeMode={'contain'}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    );
  }

  _generateListData = () => {
    return [
      { id: 'profile', profile: true },
      { id: 'track1', track: true },
      { id: 'track2', track: true },
      { id: 'track3', track: true },
      { id: 'track4', track: true },
      { id: 'track5', track: true },
      { id: 'track6', track: true },
      { id: 'track7', track: true },
    ];
  }

  _renderItem = ({ item, index }) => {
    if (item.profile) {
      return this._renderProfileCard(item, index);
    }

    if (item.track) {
      return this._renderTrackCard(item, index);
    }
  }

  _renderProfileCard = (item, index) => {
    return (
      <ProfileCard style={styles.profileCard} />
    );
  }

  _renderTrackCard = (item, index) => {
    return (
      <TrackCard style={styles.trackCard} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this._generateListData()}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.id}`}
          contentContainerStyle={styles.listContentContainer}
          style={styles.list}
        />

        <Image
          source={{ url: 'https://i1.sndcdn.com/avatars-s3HB5DUwmalQzzwL-n2iDNQ-t500x500.jpg' }}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.backgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    zIndex: -1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 24,
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  plusIcon: {
    height: 15,
    width: 15,
  },
  profileCard: {
    zIndex: 2,
    marginBottom: 16,
  },
  trackCard: {
    marginBottom: 16,
  },
  uploadTrackButton: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
