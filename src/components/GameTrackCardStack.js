import React, { Component } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';

export default class GameTrackCardStack extends Component {
  state = {
    currentCardIndex: 0,
    panAnimatedValue: new Animated.ValueXY(),
  }

  panResponder = null;

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panAnimatedValue.x,
          dy: this.state.panAnimatedValue.y,
        },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.panAnimatedValue, {
          toValue: { x: 0, y: 0 },
          friction: 6,
        }).start();
      },
    });
  }

  render() {
    const { data } = this.props;
    const { currentCardIndex, panAnimatedValue } = this.state;
    const panStyle = { transform: panAnimatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[ styles.cardContainer, panStyle ]}
        >
          {this.props.renderCard(data[currentCardIndex])}
        </Animated.View>

        <View style={styles.stackCardContainer}>
          {this.props.renderCard(data[currentCardIndex + 1])}
        </View>
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
