import React, { Component } from 'react';
import { View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import GameNoTracksCard from './GameNoTracksCard';
import GameTrackCard from './GameTrackCard';
import maestro from '../maestro';

const stackScaleValue = 0.95;
const stackTranslateYValue = -16;

const getTip = () => tips[Math.floor(Math.random() * tips.length)];
const tips = [
  "If your feedback is marked as useful by a track’s artist, you'll get a major EXP boost!",
  'The higher level you are, the more SoundHouse will prioritize showing your tracks to others to listen to and give feedback on. Level up by giving feedback to others!',
  "Working on a track idea but don't quite have it finished? Add your work in progress tracks to SoundHouse to get ideas from others!",
  "Earn EXP to level up by listening to and giving feedback on others' tracks.",
  'When you add a new track to SoundHouse, use the description of your track as a way to communicate with others who listen to it and give feedback on it.',
  'Connect with the SoundHouse team! Follow us on social media! @soundhouse.app',
  'Help us improve Soundhouse! Check your email for an invite to the official Soundhouse discord server.',
  'SoundHouse was built as a way for any musician or producer to be heard and get feedback on their music.',
  'Wear headphones for a better overall experience when listening to tracks on Soundhouse.',
];

const { gameManager, playbackManager } = maestro.managers;

export default class GameTrackCardStack extends Component {
  state = {
    animating: false,
    currentTrackIndex: gameManager.store.currentTrackIndex,
    currentTip: getTip(),
    nextTip: getTip(),
    panAnimatedValue: new Animated.ValueXY(),
    stackScaleAnimatedValue: new Animated.Value(stackScaleValue),
    stackTranslateYAnimatedValue: new Animated.Value(0),
  }

  panResponder = null;
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

  _animateNextTrack = async (velocityX, velocityY) => {
    maestro.dispatchEvent('GAME_ANIMATING_NEXT_TRACK');

    if (this.state.animating) {
      return;
    }

    const nextTrack = gameManager.getNextTrack();

    await playbackManager.pause();

    this.setState({ animating: true });

    if (nextTrack) {
      playbackManager.play(nextTrack);
    } else {
      playbackManager.stop();
    }

    if (this.topCard) {
      this.topCard.reset();
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

      this.setState({
        currentTip: this.state.nextTip,
        nextTip: getTip(),
      });

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
    const { currentTrackIndex, currentTip, nextTip, panAnimatedValue, stackScaleAnimatedValue, stackTranslateYAnimatedValue } = this.state;
    const panStyle = { transform: panAnimatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        {!!tracks.length && currentTrackIndex < tracks.length && (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[ styles.cardContainer, panStyle ]}
          >
            <GameTrackCard
              tip={currentTip}
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
              <GameTrackCard
                tip={nextTip}
                track={tracks[currentTrackIndex + 1]}
              />
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
