import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

export default props => {
  if (props.blurRadius) {
    return <Image {...props} />;
  } else {
    return <FastImage {...props} />;
  }
};
