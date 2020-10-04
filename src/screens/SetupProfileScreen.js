import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { navigationHelper, filesHelper } = maestro.helpers;

export default class SetupScreen extends Component {
  state = {
    avatarImageUri: null,
    name: null,
    loading: false,
    error: null,
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

  _submit = async () => {
    const { avatarImageUri, name } = this.state;

    if (!name) {
      return this.setState({ error: 'Please enter a name.' });
    }

    this.setState({ loading: true });

    try {
      await userManager.updateUser({ avatarImageUri, name });

      navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  render() {
    const { avatarImageUri, name, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openImagePicker}>
          <Image
            source={{ url: avatarImageUri }}
            resizeMode={'contain'}
            style={styles.image}
          />
        </TouchableOpacity>

        <TextInput
          onChangeText={text => this.setState({ name: text })}
          placeholder={'Enter Your Name'}
          value={name}
        />

        <TouchableOpacity onPress={this._submit} disabled={loading}>
          <Text>Continue</Text>
        </TouchableOpacity>

        {!!error && (
          <Text>{error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    backgroundColor: '#FF0000',
    height: 100,
    width: 100,
  },
});
