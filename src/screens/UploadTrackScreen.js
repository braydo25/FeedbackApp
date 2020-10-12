import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AudioFileField, Image, SelectField, TextField, Button } from '../components';
import maestro from '../maestro';

const { tracksManager } = maestro.managers;
const { scraperHelper, navigationHelper, interfaceHelper } = maestro.helpers;

export default class UploadTrackScreen extends Component {
  state = {
    track: null,
    url: null,
    file: null,
    name: null,
    description: null,
    genreId: null,
    genres: [],
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

    try {
      const track = await tracksManager.createTrack();
      const audioData = (url) ? await scraperHelper.scrapeUrlAudioData(this.state.url) : null;

      this.setState({
        track,
        name: audioData?.title,
        description: audioData?.description,
        loading: false,
      });

      await tracksManager.updateTrack({
        trackId: track.id,
        fields: {
          audioUri: file?.uri,
          audioBlob: audioData?.blob,
        },
      });
    } catch (error) {
      this._cleanupFailure();
      interfaceHelper.showError({ message: error.message, delay: 500 });
      navigationHelper.pop();
    }
  }

  _save = async () => {
    this.setState({ loading: true });

    try {
      const { track, name, description, genreId } = this.state;

      if (!name) {
        throw new Error('Please enter a name for this track.');
      }

      if (!genreId) {
        throw new Error('Please select a genre for this track.');
      }

      await tracksManager.updateTrack({
        trackId: track.id,
        fields: { name, description, genreId },
      });

      navigationHelper.pop();
    } catch (error) {
      this._cleanupFailure();
      interfaceHelper.showError({ message: error.message, delay: 500 });
      this.setState({ loading: false });
    }
  }

  _cleanupFailure = () => {
    const { track } = this.state;

    if (track) {
      tracksManager.removeLocalTrack(track.id);
    }
  }

  render() {
    const { track, url, file, name, description, genreId, genres, loading } = this.state;

    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
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
                    value={url}
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

              <Button onPress={this._upload} loading={loading} style={styles.button}>Continue</Button>

              <Text style={styles.infoText}>
                {
                  url && !file && loading
                    ? 'Your track is being processed...\nThis can take up to a minute.'
                    : "By continuing, you confirm that your sounds comply with our terms of service and don't infringe on other's rights."
                }
              </Text>
            </>
          )}

          {!!track && (
            <>
              <TextField
                onChangeText={text => this.setState({ name: text })}
                label={'Track Name'}
                placeholder={'Enter a name for this track...'}
                value={name}
                containerStyle={styles.formField}
              />

              <SelectField
                onOptionPress={option => this.setState({ genreId: option.value })}
                label={'Genre'}
                options={genres.map(genre => ({ text: genre.name, value: genre.id }))}
                selectedOption={genreId}
                style={styles.formField}
              />

              <TextField
                onChangeText={text => this.setState({ description: text })}
                multiline
                label={'Description'}
                placeholder={'(Optional) What do you want people to know about this track?'}
                value={description}
                style={styles.descriptionField}
              />

              <View style={styles.bottomContainer}>
                <Button onPress={this._save} loading={loading} style={styles.button}>Submit</Button>

                <Text style={styles.infoText}>
                  {
                    !loading
                      ? 'Submit your track to start getting feedback.\nSomething something'
                      : "Please wait, we're uploading your track...\nThis may take a moment..."
                  }
                </Text>
              </View>
            </>
          )}
        </SafeAreaView>
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
    paddingTop: interfaceHelper.deviceValue({ default: 96, xs: 72 }),
  },
  descriptionField: {
    minHeight: 150,
  },
  fileIcon: {
    height: interfaceHelper.deviceValue({ default: 20, xs: 16 }),
    marginLeft: interfaceHelper.deviceValue({ default: 4, xs: 6 }),
    marginRight: 8,
    width: interfaceHelper.deviceValue({ default: 16, xs: 13 }),
  },
  formField: {
    marginBottom: 24,
  },
  infoText: {
    color: '#4C4C4C',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    marginBottom: interfaceHelper.deviceValue({ default: 10, xs: 20 }),
    textAlign: 'center',
    width: '100%',
  },
  linkIcon: {
    height: interfaceHelper.deviceValue({ default: 20, xs: 18 }),
    marginRight: interfaceHelper.deviceValue({ default: 8, xs: 6 }),
    width: interfaceHelper.deviceValue({ default: 20, xs: 18 }),
  },
  orText: {
    alignSelf: 'center',
    color: '#4C4C4C',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
    marginVertical: 16,
  },
});
