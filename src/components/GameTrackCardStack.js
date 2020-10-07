import React, { Component } from 'react';
import { View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import GameNoTracksCard from './GameNoTracksCard';
import GameTrackCard from './GameTrackCard';
import maestro from '../maestro';

const stackScaleValue = 0.95;
const stackTranslateYValue = -16;

const { gameManager, playbackManager } = maestro.managers;

export default class GameTrackCardStack extends Component {
  state = {
    animating: false,
    currentTrackIndex: gameManager.store.currentTrackIndex,
    panAnimatedValue: new Animated.ValueXY(),
    stackScaleAnimatedValue: new Animated.Value(stackScaleValue),
    stackTranslateYAnimatedValue: new Animated.Value(0),
  }

  panResponder = null;
  resetTimeout = null;
  topCard = null;

  constructor() {
    super();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const { tracks } = this.props;
        const { currentTrackIndex } = this.state;

        if (currentTrackIndex === tracks.length) {
          return false;
        }

        return Math.abs(gestureState.dx) > 10;
      },
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
    if (name === 'GAME_ANIMATE_NEXT_TRACK') {
      const velocityX = ((Math.random() * 1) + 0.5) * ((Math.random() < 0.5) ? -1.25 : 1.25);
      const velocityY = ((Math.random() * 1) + 0.5) * ((Math.random() < 0.5) ? -1.25 : 1.25);

      this._animateNextTrack(velocityX, velocityY);
    }
  }

  _animateNextTrack = (velocityX, velocityY) => {
    maestro.dispatchEvent('GAME_ANIMATING_NEXT_TRACK');

    if (this.state.animating) {
      return;
    }

    const nextTrack = gameManager.getNextTrack();

    this.setState({ animating: true });

    if (nextTrack) {
      playbackManager.play(nextTrack);
    }

    Animated.decay(this.state.panAnimatedValue, {
      velocity: { x: velocityX, y: velocityY },
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(this.state.stackScaleAnimatedValue, {
        toValue: 1,
        delay: 100,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.stackTranslateYAnimatedValue, {
        toValue: stackTranslateYValue,
        delay: 100,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      gameManager.nextTrack();

      if (this.topCard) {
        this.topCard.reset();
      }

      this.state.panAnimatedValue.stopAnimation();
      this.state.panAnimatedValue.setValue({ x: 0, y: 0 });
      this.state.stackScaleAnimatedValue.setValue(stackScaleValue);

      Animated.timing(this.state.stackTranslateYAnimatedValue, {
        value: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => this.setState({ animating: false }));
    });
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
    const { currentTrackIndex, panAnimatedValue, stackScaleAnimatedValue, stackTranslateYAnimatedValue } = this.state;
    const panStyle = { transform: panAnimatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        {!!tracks.length && currentTrackIndex < tracks.length && (
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

        {currentTrackIndex + 1 <= tracks.length && (
          <Animated.View style={[
            styles.stackCardContainer,
            { transform: [ { scale: stackScaleAnimatedValue }, { translateY: stackTranslateYAnimatedValue } ] },
          ]}>
            {currentTrackIndex + 1 < tracks.length && (
              <GameTrackCard track={tracks[currentTrackIndex + 1]} />
            )}

            {currentTrackIndex + 1 === tracks.length && (
              <GameNoTracksCard />
            )}
          </Animated.View>
        )}

        {(!tracks.length || currentTrackIndex === tracks.length) && (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[ styles.cardContainer, panStyle ]}
          >
            <GameNoTracksCard />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: -1 * stackTranslateYValue,
  },
  container: {
    flex: 1,
    marginBottom: -8,
  },
  stackCardContainer: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -1 * stackTranslateYValue,
    zIndex: -1,
  },
});
