import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

export default class BabbleOverlayLevelUp extends Component {
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
      maestro.dispatchEvent('OVERLAYS:HIDE', { name: 'LevelUp' });
    });
  }

  render() {
    const { containerTranslateYAnimated } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [ { translateY: containerTranslateYAnimated } ] },
        ]}
      >
        <Image source={require('../assets/images/star.png')} style={styles.starIcon} />

        <View style={styles.textContainer}>
          <Text style={styles.levelUpText}>You leveled up!</Text>
          <Text style={styles.infoText}>Your tracks will be heard by more people, and get more feedback.</Text>
        </View>

        <Image
          source={require('../assets/images/landing-background.png')}
          blurRadius={38}
          style={styles.backgroundImage}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.95,
    zIndex: -1,
  },
  container: {
    backgroundColor: '#000000',
    borderRadius: 16,
    flexDirection: 'row',
    left: 0,
    minHeight: 120,
    overflow: 'hidden',
    paddingBottom: 20,
    paddingTop: 76,
    position: 'absolute',
    right: 0,
    top: -20,
    zIndex: 2,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    marginLeft: 1,
  },
  levelUpText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  starIcon: {
    height: 32,
    marginLeft: 16,
    width: 32,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
