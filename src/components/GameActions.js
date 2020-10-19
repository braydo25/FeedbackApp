import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Animated, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { gameManager } = maestro.managers;
const { interfaceHelper } = maestro.helpers;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class GameActions extends Component {
  state = {
    commentText: '',
    nextButtonScaleValue: new Animated.Value(1),
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveEvent(name, value) {
    if (name === 'GAME_ANIMATING_NEXT_TRACK') {
      this._pulseNextButton();
    }
  }

  _submit = async () => {
    try {
      await gameManager.createTrackComment(this.state.commentText);
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
    }

    this._resetComment();
  }

  _nextTrack = () => {
    gameManager.nextTrackAnimated();
  }

  _resetComment = () => {
    this.setState({ commentText: '' });
  }

  _pulseNextButton = () => {
    const scaleUpAnimation = {
      toValue: 1.12,
      friction: 1,
      duration: 100,
      useNativeDriver: true,
    };

    const scaleDownAnimation = {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    };

    Animated.sequence([
      Animated.timing(this.state.nextButtonScaleValue, scaleUpAnimation),
      Animated.timing(this.state.nextButtonScaleValue, scaleDownAnimation),
      Animated.timing(this.state.nextButtonScaleValue, scaleUpAnimation),
      Animated.timing(this.state.nextButtonScaleValue, scaleDownAnimation),
    ]).start();
  }

  render() {
    const { disabled } = this.props;
    const { commentText, nextButtonScaleValue } = this.state;

    return (
      <View style={[
        disabled ? styles.containerDisabled : null,
        styles.container,
      ]}>
        <AnimatedTouchableOpacity
          disabled={disabled}
          onPress={this._nextTrack}
          style={[
            styles.button,
            { transform: [ { scale: nextButtonScaleValue } ] },
          ]}
        >
          <Image
            resizeMode={'contain'}
            source={require('../assets/images/skip.png')}
            style={styles.skipIcon}
          />
        </AnimatedTouchableOpacity>

        <TextInput
          autoFocus
          multiline
          autoCorrect={false}
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
          style={[
            styles.button,
            (!commentText && !disabled) ? styles.buttonDisabled : null,
          ]}
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
  buttonDisabled: {
    opacity: 0.4,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    paddingBottom: 16,
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
    fontSize: interfaceHelper.deviceValue({ default: 15, xs: 14 }),
    marginHorizontal: 16,
    maxHeight: 100,
    minHeight: 40,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: interfaceHelper.deviceValue({ default: 10, xs: 11 }),
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
