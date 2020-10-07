import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { gameManager } = maestro.managers;

export default class GameActions extends Component {
  state = {
    commentText: '',
  }

  _submit = () => {
    gameManager.createTrackComment(this.state.commentText);

    this._resetComment();
  }

  _nextTrack = () => {
    gameManager.nextTrackAnimated();
  }

  _resetComment = () => {
    this.setState({ commentText: '' });
  }

  render() {
    const { disabled } = this.props;
    const { commentText } = this.state;

    return (
      <View style={[
        disabled ? styles.containerDisabled : null,
        styles.container,
      ]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={this._nextTrack}
          style={styles.button}
        >
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/skip.png')}
            style={styles.skipIcon}
          />
        </TouchableOpacity>

        <TextInput
          autoFocus
          multiline
          placeholder={'What do you think?'}
          placeholderTextColor={'#ACACAC'}
          onChangeText={text => this.setState({ commentText: text })}
          value={commentText}
          style={styles.input}
          ref={component => this.textInput = component}
        />

        <TouchableOpacity
          disabled={!commentText || disabled}
          onPress={this._submit}
          style={styles.button}
        >
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
  containerDisabled: {
    opacity: 0.5,
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
    height: '40%',
    width: '40%',
  },
  skipIcon: {
    height: '35%',
    width: '35%',
  },
});
