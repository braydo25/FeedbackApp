import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { gameManager } = maestro.managers;

export default class GameActions extends Component {
  state = {
    feebackText: '',
  }

  _submit = () => {
    this._resetFeedback();

    // gameManager.createTrackFeedback
  }

  _nextTrack = () => {
    gameManager.nextTrackAnimated();
  }

  _resetFeedback = () => {
    this.setState({ feedbackText: '' });
  }

  render() {
    const { feedbackText } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._nextTrack} style={styles.button}>
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/skip.png')}
            style={styles.skipIcon}
          />
        </TouchableOpacity>

        <TextInput
          multiline
          placeholder={'Enter some feedback...'}
          placeholderTextColor={'#ACACAC'}
          onChangeText={text => this.setState({ feedbackText: text })}
          value={feedbackText}
          style={styles.input}
          ref={component => this.textInput = component}
        />

        <TouchableOpacity onPress={this._submit} style={styles.button}>
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/send.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    color: '#000000',
    flex: 1,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 15,
    marginHorizontal: 16,
    maxHeight: 100,
    minHeight: 40,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
  },
  sendIcon: {
    width: '40%',
  },
  skipIcon: {
    width: '35%',
  },
});
