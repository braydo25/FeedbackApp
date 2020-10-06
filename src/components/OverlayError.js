import React, { Component } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

export default class BabbleOverlayError extends Component {
  state = {
    containerTranslateYAnimated: new Animated.Value(-250),
  }

  componentDidMount() {
    const { containerTranslateYAnimated } = this.state;
    const delay = this.props.data.delay || 0;

    Animated.sequence([
      Animated.spring(containerTranslateYAnimated, {
        toValue: 0,
        speed: 5,
        bounciness: 8,
        useNativeDriver: true,
        delay,
      }),
      Animated.timing(containerTranslateYAnimated, {
        toValue: -250,
        duration: 500,
        useNativeDriver: true,
        delay: 5000 + delay,
      }),
    ]).start(() => {
      maestro.dispatchEvent('OVERLAYS:HIDE', { name: 'Error' });
    });
  }

  render() {
    const { message } = this.props.data;
    const { containerTranslateYAnimated } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [ { translateY: containerTranslateYAnimated } ] },
        ]}
      >
        <Image source={require('../assets/images/error.png')} style={styles.errorIcon} />
        <Text style={styles.errorText}>{message}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(248, 44, 71, 0.95)',
    borderRadius: 16,
    flexDirection: 'row',
    left: 0,
    minHeight: 120,
    paddingBottom: 20,
    paddingTop: 76,
    position: 'absolute',
    right: 0,
    top: -20,
    zIndex: 2,
  },
  errorIcon: {
    height: 25,
    marginLeft: 16,
    width: 25,
  },
  errorText: {
    color: '#FFFFFF',
    flex: 1,
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 18,
    paddingHorizontal: 16,
  },
});
