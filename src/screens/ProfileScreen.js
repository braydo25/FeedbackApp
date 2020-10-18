import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Card, Image, ProfileCard, TracksList, UploadTrackCard } from '../components';
import maestro from '../maestro';

const { navigationHelper, interfaceHelper } = maestro.helpers;
const { userManager, playbackManager, tracksManager } = maestro.managers;

export default class ProfileScreen extends Component {
  state = {
    user: null,
    tracks: null,
  }

  async componentDidMount() {
    maestro.link(this);

    const params = this.props.route.params || {};
    const { userId } = params;

    if (!userId) {
      return navigationHelper.pop();
    }

    this._loadUser();
    this._loadTracks();

    this.props.navigation.setOptions({
      rightButtonComponent: (userId === userManager.store.user.id) ? this._renderEditProfileButton() : null,
    });
  }

  componentWillUnmount() {
    playbackManager.pause();

    maestro.unlink(this);
  }

  receiveStoreUpdate({ user, tracks }) {
    if (this.state.user.id !== userManager.store.user.id) {
      return;
    }

    this.setState({
      user: user.user,
      tracks: tracks.tracks,
    });
  }

  _loadUser = async () => {
    const params = this.props.route.params || {};
    const { userId } = params;

    try {
      this.setState({ user: await userManager.getUser(userId) });
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
      navigationHelper.pop();
    }
  }

  _loadTracks = async () => {
    const params = this.props.route.params || {};
    const { userId } = params;

    try {
      this.setState({ tracks: await tracksManager.getUserTracks(userId) });
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
    }
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
    const { user,  tracks } = this.state;

    return (
      <>
        <ProfileCard user={this.state.user} style={styles.profileCard} />

        {!!tracks?.length && user && user.id === userManager.store.user.id && (
          <Card style={styles.uploadTrackCard}>
            <Button small onPress={() => navigationHelper.navigate('UploadTrackNavigator')}>Add New Track</Button>
          </Card>
        )}
      </>
    );
  }

  _renderNoTracks = () => {
    const { user, tracks } = this.state;

    return (user && user.id === userManager.store.user.id && tracks !== null) ? (
      <UploadTrackCard />
    ) : null;
  }

  _renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  _renderFooter = () => {
    return (
      <ActivityIndicator color={'#000000'} size={'large'} />
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
          source={{ uri: user.avatarUrl }}
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
    height: '100%',
    opacity: 0.5,
    width: '100%',
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
