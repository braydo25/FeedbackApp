import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;

export default class AvatarButton extends Component {
  _onPress = () => {
    const { onPress, user } = this.props;

    if (onPress) {
      onPress();
    }

    navigationHelper.push('ProfileNavigator', {
      screen: 'Profile',
      params: { userId: user.id },
    });
  }

  render() {
    const { user, style } = this.props;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={style}
        />
      </TouchableOpacity>
    );
  }
}
