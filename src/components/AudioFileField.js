import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import FieldLabel from './FieldLabel';
import Image from './Image';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default class AudioFileField extends Component {
  state = {
    file: null,
  }

  _onPress = async () => {
    const { onFileChanged } = this.props;
    const file = (!this.state.file)
      ? await DocumentPicker.getDocumentAsync({ type: 'audio/*' })
      : null;

    if (file?.type !== 'cancel') {
      onFileChanged(file);
      this.setState({ file });
    }
  }

  render() {
    const { label, labelPrefix, labelPostfix, info, disabled, style } = this.props;
    const { file } = this.state;

    return (
      <View style={[ styles.container, style ]}>
        {label && (
          <FieldLabel
            info={info}
            prefix={labelPrefix}
            postfix={labelPostfix}
            containerStyle={styles.fieldLabelContainer}
          >
            {label}
          </FieldLabel>
        )}

        <TouchableOpacity onPress={this._onPress} disabled={disabled} style={styles.fileBox}>
          <View>
            <Image
              source={require('../assets/images/music-file.png')}
              style={styles.fileImage}
            />

            {!!file && (
              <Image
                source={require('../assets/images/checkmark.png')}
                style={styles.fileCheckmarkIcon}
              />
            )}
          </View>

          <Text style={styles.fileCallToActionText}>{(!file) ? 'Tap to select audio file' : file.name}</Text>
          <Text style={styles.supportedFilesText}>
            {!!file && 'Tap to remove file.'}

            {!file && (
              <>
                <Text>Supported formats</Text>
                <Text style={styles.fileFormatsText}> .mp3</Text>,
                <Text style={styles.fileFormatsText}> .wav</Text>,
                <Text style={styles.fileFormatsText}> .flac</Text>,
                <Text style={styles.fileFormatsText}> .aiff</Text>,
                <Text style={styles.fileFormatsText}> .m4a</Text>
              </>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  fieldLabelContainer: {
    marginBottom: 16,
  },
  fileBox: {
    alignItems: 'center',
    borderColor: '#CECECE',
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 2,
    justifyContent: 'center',
    paddingVertical: interfaceHelper.deviceValue({ default: 40, xs: 30 }),
    width: '100%',
  },
  fileCallToActionText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 20, xs: 17 }),
    letterSpacing: 0.44,
  },
  fileCheckmarkIcon: {
    bottom: 16,
    height: interfaceHelper.deviceValue({ default: 24, xs: 20 }),
    position: 'absolute',
    right: 0,
    width: interfaceHelper.deviceValue({ default: 24, xs: 20 }),
  },
  fileFormatsText: {
    color: '#7C4BCE',
  },
  fileImage: {
    height: interfaceHelper.deviceValue({ default: 84, xs: 63 }),
    marginBottom: interfaceHelper.deviceValue({ default: 24, xs: 18 }),
    width: interfaceHelper.deviceValue({ default: 67, xs: 50 }),
  },
  supportedFilesText: {
    color: '#999999',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    letterSpacing: 0.35,
    marginTop: 6,
  },
});
