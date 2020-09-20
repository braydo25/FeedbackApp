import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MainScreen from './screens/MainScreen';

TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

export default class App extends Component {
  render() {
    return (
      <MainScreen />
    );
  }
}
