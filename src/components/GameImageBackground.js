import React, { PureComponent } from 'react';
import { Animated, View, Easing, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { gameManager } = maestro.managers;

export default class GameImageBackground extends PureComponent {
  state = {
    lastVisibileImage: 'one',
    imageOneUrl: null,
    imageOneOpacityAnimatedValue: new Animated.Value(0),
    imageTwoUrl: null,
    imageTwoOpacityAnimatedValue: new Animated.Value(0),
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ game }) {
    if (!this.state.imageOneUrl && game.tracks) {
      this.setState({ imageOneUrl: game.tracks[0]?.user?.avatarUrl });
      this._animate();
    }
  }

  receiveEvent(name, value) {
    if (name === 'GAME_ANIMATING_NEXT_TRACK') {
      const nextTrack = gameManager.getNextTrack();
      const nextImageUrl = (nextTrack) ? nextTrack.user.avatarUrl : null;
      const { lastVisibileImage, imageOneUrl, imageTwoUrl } = this.state;

      this.setState({
        lastVisibileImage: (lastVisibileImage === 'one') ? 'two' : 'one',
        imageOneUrl: (lastVisibileImage === 'two') ? nextImageUrl : imageOneUrl,
        imageTwoUrl: (lastVisibileImage === 'one') ? nextImageUrl : imageTwoUrl,
      }, () => {
        this._animate();
      });
    }
  }

  _animate = () => {
    const { lastVisibileImage } = this.state;

    Animated.parallel([
      Animated.timing(this.state.imageOneOpacityAnimatedValue, {
        toValue: (lastVisibileImage === 'one') ? 0.95 : 0,
        delay: 100,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.imageTwoOpacityAnimatedValue, {
        toValue: (lastVisibileImage === 'two') ? 0.95 : 0,
        delay: 100,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { imageOneUrl, imageOneOpacityAnimatedValue, imageTwoUrl, imageTwoOpacityAnimatedValue } = this.state;

    return (
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: imageOneUrl }}
          resizeMode={'cover'}
          blurRadius={39}
          style={[ styles.imageOne, { opacity: imageOneOpacityAnimatedValue } ]}
        />

        <Animated.Image
          source={{ uri: imageTwoUrl }}
          resizeMode={'cover'}
          blurRadius={39}
          style={[ styles.imageTwo, { opacity: imageTwoOpacityAnimatedValue } ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: -1,
  },
  imageOne: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  imageTwo: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
});
