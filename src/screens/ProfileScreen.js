import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Card, ProfileCard, TracksList, UploadTrackCard } from '../components';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;
const { userManager, tracksManager } = maestro.managers;

export default class ProfileScreen extends Component {
  state = {
    user: null,
    tracks: null,
  }

  componentDidMount() {
    maestro.link(this);

    this.setState({ user: userManager.store.user });

    this.props.navigation.setOptions({
      rightButtonComponent: this._renderEditProfileButton(),
    });

    this._loadTracks();
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ user, tracks }) {
    this.setState({
      user: user.user,
      tracks: tracks.tracks,
    });
  }

  _loadTracks = async () => {
    return tracksManager.loadTracks();
  }

  _renderEditProfileButton = () => {
    return (
      <TouchableOpacity onPress={() => navigationHelper.navigate('ProfileEdit')} style={styles.editProfileButton}>
        <Image
          source={require('../assets/images/settings.png')}
          resizeMode={'contain'}
          style={styles.editProfileIcon}
        />
      </TouchableOpacity>
    );
  }

  _renderHeader = () => {
    const { tracks } = this.state;

    return (
      <>
        <ProfileCard user={this.state.user} style={styles.profileCard} />

        {!!tracks?.length && (
          <Card style={styles.uploadTrackCard}>
            <Button small onPress={() => navigationHelper.navigate('UploadTrackNavigator')}>Add New Track</Button>
          </Card>
        )}
      </>
    );
  }

  _renderNoTracks = () => {
    return (
      <UploadTrackCard />
    );
  }

  _renderFooter = () => {
    return (
      <ActivityIndicator size={'large'} />
    );
  }

  _renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  render() {
    const { user, tracks } = this.state;

    if (!user) {
      return this._renderLoading();
    }

    return (
      <View style={styles.container}>
        <TracksList
          tracks={tracks}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={!tracks ? this._renderFooter : null}
          ListFooterComponentStyle={styles.footer}
          ListEmptyComponent={this._renderNoTracks}
          contentContainerStyle={styles.listContentContainer}
          style={styles.list}
        />

        <Image
          source={{ url: user.avatarUrl }}
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
  editProfileButton: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
    width: 40,
  },
  editProfileIcon: {
    height: 22,
    width: 22,
  },
  footer: {
    marginTop: 16,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 96,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  profileCard: {
    marginBottom: 16,
    zIndex: 2,
  },
  uploadTrackCard: {
    marginBottom: 16,
    padding: 16,
  },
});
