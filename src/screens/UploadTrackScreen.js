import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AudioFileField, SelectField, TextField, Button } from '../components';
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
    genres: [],
    uploading: false,
    loading: false,
    error: null,
  }

  componentDidMount() {
    this._loadGenres();
  }

  _loadGenres = async () => {
    const genres = await tracksManager.getGenres();

    this.setState({ genres });
  }

  _upload = async () => {
    const { url, file } = this.state;

    this.setState({ loading: true });

    let audioData = null;
    let track = null;

    try {
      audioData = (url) ? await scraperHelper.scrapeUrlAudioData(this.state.url) : null;

      this.setState({
        uploading: false,
        loading: false,
      });

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
    const { track, url, file, name, description, genreId, genres, uploading, loading, error } = this.state;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {false && (
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
              style={styles.button}
            >
              Continue
            </Button>

            <Text style={styles.disclaimerText}>By continuing, you confirm that your sounds comply with our terms of service and don't infringe on other's rights.</Text>
          </>
        )}

        {(track || uploading || true) && (
          <>
            <TextField
              onChangeText={text => this.setState({ name: text })}
              label={'Track Name'}
              placeholder={'(Optional) Test test Test Test Hello Test'}
              containerStyle={styles.formField}
              value={name}
            />

            <SelectField
              onOptionPress={option => this.setState({ genreId: option.value })}
              label={'Genre'}
              options={genres.map(genre => ({ text: genre.name, value: genre.id }))}
              selectedOption={genreId}
              style={styles.formField}
            />

            <TextField
              multiline
              label={'Description'}
              placeholder={'(Optional) What do you want people to know about this track? Or, what do you want feedback on?'}
              style={styles.descriptionField}
            />

            <View style={styles.bottomContainer}>
              <Button style={styles.button}>Submit</Button>
              <Text style={styles.disclaimerText}>Please wait, we're uploading & processing your track...{'\n'}This may take a moment...</Text>
            </View>
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
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    minHeight: '100%',
    paddingHorizontal: 16,
    paddingTop: 96,
  },
  descriptionField: {
    minHeight: 150,
  },
  disclaimerText: {
    color: '#4C4C4C',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    marginBottom: 60,
    textAlign: 'center',
    width: '100%',
  },
  fileIcon: {
    height: 20,
    marginLeft: 4,
    marginRight: 8,
    width: 16,
  },
  formField: {
    marginBottom: 24,
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
  saveButton: {
    marginBottom: 60,
  },
});
