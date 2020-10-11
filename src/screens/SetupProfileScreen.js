import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Card, Image, TextField, MultiSelectField } from '../components';
import maestro from '../maestro';

const { userManager, tracksManager } = maestro.managers;
const { filesHelper, navigationHelper, interfaceHelper } = maestro.helpers;

export default class SetupProfileScreen extends Component {
  state = {
    avatarImageUri: null,
    name: null,
    preferredGenreIds: [],
    genres: [],
    loading: false,
  }

  componentDidMount() {
    this._loadGenres();
  }

  _loadGenres = async () => {
    const genres = await tracksManager.getGenres();

    this.setState({ genres });
  }

  _openImagePicker = async () => {
    const image = await filesHelper.selectImage({
      allowsEditing: true,
      aspect: [ 1, 1 ],
      width: 384,
    });

    if (image && !image.cancelled) {
      this.setState({ avatarImageUri: image.uri });
    }
  }

  _onOptionPress = option => {
    let preferredGenreIds = [ ...this.state.preferredGenreIds ];

    if (preferredGenreIds.includes(option.value)) {
      preferredGenreIds = preferredGenreIds.filter(genreId => genreId !== option.value);
    } else {
      preferredGenreIds.push(option.value);
    }

    this.setState({ preferredGenreIds });
  }

  _save = async () => {
    const { avatarImageUri, name, preferredGenreIds } = this.state;

    try {
      if (!avatarImageUri) {
        throw new Error('Please select a profile picture.');
      }

      if (!name) {
        throw new Error('Please enter a name.');
      }

      if (preferredGenreIds.length < 3) {
        throw new Error('Please select at least 3 preferred genres.');
      }

      this.setState({ loading: true });

      await userManager.updateUser({ avatarImageUri, name, preferredGenreIds });

      navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
      this.setState({ loading: false });
    }
  }

  render() {
    const { avatarImageUri, name, preferredGenreIds, genres, loading } = this.state;
    const defaultAvatarImage = require('../assets/images/default-avatar.png');
    const defaultBackgroundImage = require('../assets/images/landing-background.png');

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={this._openImagePicker} style={styles.avatarButton}>
              <Image
                source={(avatarImageUri) ? { uri: avatarImageUri } : defaultAvatarImage}
                resizeMode={'contain'}
                style={styles.avatarImage}
              />
            </TouchableOpacity>

            <Text style={styles.artistNameText}>{name || 'Setup Profile'}</Text>
          </View>

          <View style={styles.formContainer}>
            <Card style={styles.formCard}>
              <TextField
                autoCorrect={false}
                onChangeText={text => this.setState({ name: text })}
                returnKeyType={'done'}
                label={'Name'}
                placeholder={'What do people call you?'}
                value={name}
              />
            </Card>

            <Card style={styles.formCard}>
              <MultiSelectField
                onOptionPress={this._onOptionPress}
                label={'Preferred Genres'}
                info={'Pick the genres you want to listen to, and give feedback to.'}
                options={genres.map(genre => ({ text: genre.name, value: genre.id }))}
                selectedOptions={preferredGenreIds}
              />
            </Card>

            <Card style={styles.formCard}>
              <Button loading={loading} onPress={this._save}>Continue</Button>
            </Card>
          </View>
        </KeyboardAwareScrollView>

        <Image
          source={(avatarImageUri) ? { uri: avatarImageUri } : defaultBackgroundImage}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.topContainerBackgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistNameText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 18, xs: 16 }),
    marginTop: 16,
    minHeight: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
    textAlign: 'center',
  },
  avatarButton: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
  },
  avatarImage: {
    alignSelf: 'center',
    borderRadius: 25,
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 100,
  },
  formCard: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    paddingBottom: 48,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.75,
    zIndex: -1,
  },
});
