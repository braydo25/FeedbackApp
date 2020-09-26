import React, { Component } from 'react';
import { View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import GameTrackCard from './GameTrackCard';
import maestro from '../maestro';

const stackScaleValue = 0.95;

const { gameManager, playbackManager } = maestro.managers;

export default class GameTrackCardStack extends Component {
  state = {
    currentTrackIndex: gameManager.store.currentTrackIndex,
    panAnimatedValue: new Animated.ValueXY(),
    stackScaleAnimatedValue: new Animated.Value(stackScaleValue),
  }

  panResponder = null;
  resetTimeout = null;
  topCard = null;

  constructor() {
    super();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (event, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panAnimatedValue.x,
          dy: this.state.panAnimatedValue.y,
        },
      ], { useNativeDriver: false }),
      onPanResponderRelease: this._panResponderRelease,
    });
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);

    clearTimeout(this.resetTimeout);
  }

  receiveStoreUpdate({ game }) {
    this.setState({ currentTrackIndex: game.currentTrackIndex });
  }

  receiveEvent(name, value) {
    if (name === 'GAME_NEXT_TRACK_ANIMATED') {
      const velocityX = ((Math.random() * 1) + 0.5) * ((Math.random() < 0.5) ? -1 : 1);
      const velocityY = ((Math.random() * 1) + 0.5) * ((Math.random() < 0.5) ? -1 : 1);

      this._animateNextTrack(velocityX, velocityY);
    }
  }

  _animateNextTrack = (velocityX, velocityY) => {
    Animated.decay(this.state.panAnimatedValue, {
      velocity: { x: velocityX, y: velocityY },
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.stackScaleAnimatedValue, {
      toValue: 1,
      delay: 100,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    playbackManager.next();

    this.resetTimeout = setTimeout(() => {
      gameManager.nextTrack();
      this.topCard.reset();
      this.state.panAnimatedValue.stopAnimation();
      this.state.panAnimatedValue.setValue({ x: 0, y: 0 });
      this.state.stackScaleAnimatedValue.setValue(stackScaleValue);
    }, 500);
  }

  _panResponderRelease = (event, gestureState) => {
    const absVelocityX = Math.abs(gestureState.vx);
    const absVelocityY = Math.abs(gestureState.vy);

    if (absVelocityX > 0.75 || absVelocityY > 0.75) {
      this._animateNextTrack(gestureState.vx, gestureState.vy);
    } else {
      Animated.spring(this.state.panAnimatedValue, {
        toValue: { x: 0, y: 0 },
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    const { tracks } = this.props;
    const { currentTrackIndex, panAnimatedValue, stackScaleAnimatedValue } = this.state;
    const panStyle = { transform: panAnimatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        {!!tracks?.length && currentTrackIndex < tracks?.length && (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[ styles.cardContainer, panStyle ]}
          >
            <GameTrackCard
              track={tracks[currentTrackIndex]}
              ref={component => this.topCard = component}
            />
          </Animated.View>
        )}

        {currentTrackIndex + 1 < tracks?.length && (
          <Animated.View style={[
            styles.stackCardContainer,
            { transform: [ { scale: stackScaleAnimatedValue } ] },
          ]}>
            <GameTrackCard
              track={tracks[currentTrackIndex + 1]}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  stackCardContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
