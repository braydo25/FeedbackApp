import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default props => (
  <View style={styles.container}>
    <ActivityIndicator color={'#FFFFFF'} size={'large'} />
    <Text style={styles.text}>Checking for & installing updates...</Text>

    <Image
      source={require('../assets/images/landing-background.png')}
      blurRadius={39}
      resizeMode={'cover'}
      style={styles.backgroundImage}
    />
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.75,
    width: '100%',
    zIndex: -1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
    fontWeight: '500',
    marginTop: 16,
  },
});
