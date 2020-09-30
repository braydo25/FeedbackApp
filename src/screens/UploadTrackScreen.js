import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default class UploadTrackScreen extends Component {
  state = {
    
  }

  _selectFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

    console.log(file);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={'SoundCloud Track or YouTube URL'}
        />

        <Text>Or</Text>

        <TouchableOpacity onPress={this._selectFile}>
          <Text>Select A File</Text>
        </TouchableOpacity>

        <TouchableOpacity>
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
