import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default props => (
  <View style={[ styles.container, props.containerStyle ]}>
    <View style={styles.labelContainer}>
      {props.prefix}
      <Text style={styles.labelText}>{props.children}</Text>
      {props.postfix}
    </View>

    {!!props.info && (
      <Text style={styles.infoText}>{props.info}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  infoText: {
    color: '#4D4D4D',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  labelText: {
    color: '#101426',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    letterSpacing: 0.1,
  },
});
