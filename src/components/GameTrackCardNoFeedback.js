import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default props => (
  <View style={styles.container}>
    <Image
      source={require('../assets/images/comment-purple.png')}
      style={styles.image}
    />

    <Text style={styles.tipText}>This track hasn't received any feedback.{'\n'}Give feedback to earn an EXP bonus!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: '#7D4CCF',
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    marginHorizontal: 8,
    padding: 12,
  },
  image: {
    height: 26,
    width: 26,
  },
  tipText: {
    color: '#7D4CCF',
    flex: 1,
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    lineHeight: 20,
    marginLeft: 12,
  },
});
