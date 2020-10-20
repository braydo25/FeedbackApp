import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default props => (
  <View style={styles.container}>
    <View>
      <Text style={styles.titleText}>Here's a tip...</Text>
    </View>

    <View>
      <Text style={styles.tipText}>{props.tip}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  tipText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 12 }),
    lineHeight: 20,
    marginTop: 8,
  },
  titleText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
});
