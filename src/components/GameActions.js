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
            style={styles.actionImage}
          />
        </TouchableOpacity>

        <TextInput
          multiline
          placeholder={'Enter some feedback...'}
          onChangeText={text => this.setState({ feedbackText: text })}
          value={feedbackText}
          style={styles.input}
          ref={component => this.textInput = component}
        />

        <TouchableOpacity onPress={this._submit} style={[ styles.button, styles.sendButton ]}>
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/send.png')}
            style={styles.actionImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionImage: {
    width: '50%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    borderRadius: 20,
    color: '#3E3E42',
    flex: 1,
    //fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    marginHorizontal: 16,
    maxHeight: 100,
    minHeight: 40,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sendButton: {
    backgroundColor: '#EC3063',
  },
});
