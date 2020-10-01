import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import maestro from '../maestro';

const { tracksManager } = maestro.managers;
const { scraperHelper } = maestro.helpers;

export default class UploadTrackScreen extends Component {
  state = {
    url: null,
    file: null,
    name: null,
    description: null,
    genreId: null,
    error: null,
  }

  _selectFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

    this.setState({ file });
  }

  _continue = async () => {
    const audioData = await scraperHelper.scrapeUrlAudioData(this.state.url);
    const track = await tracksManager.createTrack({ audioBlob: audioData.blob });
    console.log(audioData);
    console.log(track);
  }

  render() {
    const { url, file } = this.state;

    return (
      <View style={styles.container}>
        {!file && (
          <>
            <TextInput
              onChangeText={text => this.setState({ url: text })}
              placeholder={'SoundCloud Track or YouTube URL'}
            />

            <Text>Or</Text>

            <TouchableOpacity onPress={this._selectFile}>
              <Text>Select A File</Text>
            </TouchableOpacity>
          </>
        )}

        {file && (
          <TouchableOpacity onPress={() => this.setState({ file: null })}>
            <Text>{file.name} (Tap to remove)</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={this._continue} disabled={!url && !file}>
          <Text>Continue</Text>
        </TouchableOpacity>
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
