import React, { Component } from 'react';
import { Animated, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import maestro from './maestro';

TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

export default class App extends Component {
  state = {
    initialRouteName: 'Game',
    containerOpacityAnimated: new Animated.Value(0),
  }

  componentDidMount() {
    maestro.link(this);

    setTimeout(() => this._toggleVisibility(true), 750);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  async receiveEvent(name, data) {
    if (name === 'ROOT_NAVIGATION_RESET') {
      await this._toggleVisibility(false);

      await new Promise(resolve => {
        this.setState({ initialRouteName: data.routeName }, resolve);
      });

      this._toggleVisibility(true);
    }
  }

  _toggleVisibility = show => {
    return new Promise(resolve => {
      Animated.timing(this.state.containerOpacityAnimated, {
        toValue: (show) ? 1 : 0,
        duration: 750,
        useNativeDriver: true,
      }).start(resolve);
    });
  }

  render() {
    const { initialRouteName, containerOpacityAnimated } = this.state;

    return (
      <Animated.View style={{ flex: 1, opacity: containerOpacityAnimated }}>
        <NavigationContainer
          theme={{ colors: { background: '#FFFFFF' } }}
          key={`navigation_base_${initialRouteName}`}
        >
          <StatusBar barStyle={'light-content'} />
          <RootNavigator initialRouteName={initialRouteName} />
        </NavigationContainer>
      </Animated.View>
    );
  }
}
