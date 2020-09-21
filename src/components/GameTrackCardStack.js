import React, { Component } from 'react';
import { View, PanResponder, Animated, Easing, StyleSheet } from 'react-native';
import { GameTrackCard } from './';

const stackScaleValue = 0.95;

export default class GameTrackCardStack extends Component {
  state = {
    currentTrackIndex: 0,
    panAnimatedValue: new Animated.ValueXY(),
    stackScaleAnimatedValue: new Animated.Value(stackScaleValue),
  }

  panResponder = null;

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

  _panResponderRelease = (event, gestureState) => {
    const velocityX = Math.abs(gestureState.vx);
    const velocityY = Math.abs(gestureState.vy);

    if (velocityX > 0.75 || velocityY > 0.75) {
      Animated.decay(this.state.panAnimatedValue, {
        velocity: { x: gestureState.vx, y: gestureState.vy },
        useNativeDriver: true,
      }).start();

      Animated.timing(this.state.stackScaleAnimatedValue, {
        toValue: 1,
        delay: 100,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        this.state.panAnimatedValue.stopAnimation();
        this.state.panAnimatedValue.setValue({ x: 0, y: 0 });
        this.state.stackScaleAnimatedValue.setValue(stackScaleValue);
      }, 500);
    } else {
      Animated.spring(this.state.panAnimatedValue, {
        toValue: { x: 0, y: 0 },
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }

  _renderCard = card => {
    return (
      <GameTrackCard />
    );
  }

  render() {
    const { tracks } = this.props;
    const { currentTrackIndex, panAnimatedValue, stackScaleAnimatedValue } = this.state;
    const panStyle = { transform: panAnimatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[ styles.cardContainer, panStyle ]}
        >
          {this._renderCard(tracks[currentTrackIndex])}
        </Animated.View>

        <Animated.View style={[
          styles.stackCardContainer,
          { transform: [ { scale: stackScaleAnimatedValue } ] },
        ]}>
          {this._renderCard(tracks[currentTrackIndex + 1])}
        </Animated.View>
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
