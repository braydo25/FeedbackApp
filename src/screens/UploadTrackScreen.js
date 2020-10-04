import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AudioFileField, TextField, Button } from '../components';
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
      console.log(error);
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {!track && (
          <>
            {!file && (
              <>
                <TextField
                  onChangeText={text => this.setState({ url: text })}
                  label={'Paste Link'}
                  labelPrefix={<Image source={require('../assets/images/link.png')} style={styles.linkIcon} />}
                  info={"Import a SoundCloud track or a YouTube video's audio."}
                  returnKeyType={'done'}
                  placeholder={'soundcloud.com/yourname/trackname'}
                />

                <Text style={styles.orText}>- or -</Text>
              </>
            )}

            <AudioFileField
              onFileChanged={file => this.setState({ file })}
              label={'Select Audio File'}
              labelPrefix={<Image source={require('../assets/images/file.png')} style={styles.fileIcon} />}
              disabled={loading}
              style={styles.audioFileField}
            />

            <Button
              onPress={this._upload}
              loading={loading}
              style={styles.continueButton}
            >
              Continue
            </Button>
          </>
        )}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  audioFileField: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 96,
  },
  continueButton: {
    marginBottom: 60,
  },
  fileIcon: {
    height: 20,
    marginLeft: 4,
    marginRight: 8,
    width: 16,
  },
  linkIcon: {
    height: 20,
    marginRight: 8,
    width: 20,
  },
  orText: {
    alignSelf: 'center',
    color: '#4C4C4C',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 16,
    marginVertical: 16,
  },
});
