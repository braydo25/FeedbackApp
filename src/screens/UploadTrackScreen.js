import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import maestro from '../maestro';

const { tracksManager } = maestro.managers;
const { scraperHelper, navigationHelper } = maestro.helpers;

export default class UploadTrackScreen extends Component {
  state = {
    track: null,
    url: null,
    file: null,
    name: null,
    description: null,
    genreId: null,
    loading: false,
    error: null,
  }

  _selectFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

    this.setState({ file });
  }

  _upload = async () => {
    const { url, file } = this.state;

    this.setState({ loading: true });

    let audioData = null;
    let track = null;

    try {
      audioData = (url) ? await scraperHelper.scrapeUrlAudioData(this.state.url) : null;
      track = (file)
        ? await tracksManager.createTrack({ audioUri: file.uri })
        : await tracksManager.createTrack({
          audioBlob: audioData.blob,
          name: audioData.title,
          description: audioData.description,
        });

      this.setState({
        track,
        name: audioData?.title,
        description: audioData?.description,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  _save = async () => {
    const { track, name, description, genreId } = this.state;

    this.setState({ loading: true });

    try {
      await tracksManager.updateTrack({
        trackId: track.id,
        fields: { name, description, genreId },
      });

      navigationHelper.pop();
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  render() {
    const { track, url, file, name, description, genreId, loading, error } = this.state;

    return (
      <View style={styles.container}>
        {!track && (
          <>
            {!file && (
              <>
                <TextInput
                  onChangeText={text => this.setState({ url: text })}
                  placeholder={'SoundCloud Track or YouTube URL'}
                />

                <Text>Or</Text>

                <TouchableOpacity disabled={loading} onPress={this._selectFile}>
                  <Text>Select A File</Text>
                </TouchableOpacity>
              </>
            )}

            {file && (
              <TouchableOpacity onPress={() => this.setState({ file: null })}>
                <Text>{file.name} (Tap to remove)</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={this._upload} disabled={!url && !file}>
              {!loading && (
                <Text>Continue</Text>
              )}

              {loading && (
                <ActivityIndicator />
              )}
            </TouchableOpacity>
          </>
        )}

        {track && (
          <>
            <TextInput
              placeholder={'Track Name'}
              value={name}
            />

            <TextInput
              placeholder={'genreId'}
              onChangeText={text => this.setState({ genreId: text })}
              value={genreId}
            />

            <TextInput
              multiline
              placeholder={'Track Description'}
              value={description}
            />

            <TouchableOpacity onPress={this._save} disabled={!name}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </>
        )}

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
});
