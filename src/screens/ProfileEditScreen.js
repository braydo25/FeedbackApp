import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, TextField, MultiSelectField } from '../components';
import maestro from '../maestro';

const { userManager, tracksManager } = maestro.managers;
const { filesHelper, interfaceHelper } = maestro.helpers;

export default class ProfileEditScreen extends Component {
  state = {
    avatarImageUri: null,
    name: userManager.store.user.name,
    preferredGenreIds: userManager.store.user.preferredGenreIds || [],
    genres: [],
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      onRightButtonPress: this._save,
    });

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
    const { navigation } = this.props;
    const { avatarImageUri, name, preferredGenreIds } = this.state;

    navigation.setOptions({ showRightLoading: true });

    try {
      await userManager.updateUser({ avatarImageUri, name, preferredGenreIds });

      navigation.pop();
    } catch (error) {
      navigation.setOptions({ showRightLoading: false });
    }
  }

  render() {
    const { user } = userManager.store;
    const { avatarImageUri, name, preferredGenreIds, genres } = this.state;

    return (
      <KeyboardAwareScrollView
        style={styles.container}
      >
        <View style={styles.artistContainer}>
          <TouchableOpacity onPress={this._openImagePicker} style={styles.avatarButton}>
            <Image
              source={{ uri: avatarImageUri || user.avatarUrl }}
              resizeMode={'contain'}
              style={styles.avatarImage}
            />
          </TouchableOpacity>

          <Text style={styles.artistNameText}>{name}</Text>

          <Image
            source={{ uri: avatarImageUri || user.avatarUrl }}
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

          <TouchableOpacity onPress={() => userManager.logout()} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    minHeight: '100%',
    opacity: 0.5,
    top: -250,
    width: '100%',
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
    paddingHorizontal: 12,
    paddingTop: 32,
  },
  formField: {
    marginBottom: 24,
  },
  logoutButton: {
    alignItems: 'center',
    width: '100%',
  },
  logoutText: {
    color: '#7C4BCE',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
});
