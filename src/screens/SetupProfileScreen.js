import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Image, TextField, MultiSelectField } from '../components';
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
      quality: 1,
    });

    if (!image.cancelled) {
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={styles.artistContainer}>
          <TouchableOpacity onPress={this._openImagePicker} style={styles.avatarButton}>
            <Image
              source={(avatarImageUri) ? { uri: avatarImageUri } : defaultAvatarImage}
              resizeMode={'contain'}
              style={styles.avatarImage}
            />
          </TouchableOpacity>

          <Text style={styles.artistNameText}>{name}</Text>

          <Image
            source={(avatarImageUri) ? { uri: avatarImageUri } : defaultBackgroundImage}
            resizeMode={'cover'}
            blurRadius={39}
            style={styles.artistContainerBackgroundImage}
          />
        </View>

        <View style={styles.formContainer}>
          <TextField
            autoCorrect={false}
            onChangeText={text => this.setState({ name: text })}
            label={'Name'}
            placeholder={'What do people call you?'}
            value={name}
            containerStyle={styles.formField}
          />

          <MultiSelectField
            onOptionPress={this._onOptionPress}
            label={'Preferred Genres'}
            info={'Pick the genres you want to listen to, and give feedback to.'}
            options={genres.map(genre => ({ text: genre.name, value: genre.id }))}
            selectedOptions={preferredGenreIds}
            style={styles.formField}
          />

          <Button loading={loading} onPress={this._save}>Continue</Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  artistContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 100,
  },
  artistContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    top: -210,
    zIndex: -1,
  },
  artistNameText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 18,
    marginTop: 16,
    minHeight: 22,
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
  formContainer: {
    paddingBottom: 48,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  formField: {
    marginBottom: 24,
  },
});
