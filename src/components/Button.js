import React, { Component } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

export default class Button extends Component {
  render() {
    const { children, small, disabled, loading, style, ...props } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled || loading}
        style={[
          styles.container,
          (small) ? styles.small : null,
          style,
        ]}
        {...props}
      >
        {!loading && (
          <Text style={styles.text}>{children}</Text>
        )}

        {loading && (
          <ActivityIndicator color={'#FFFFFF'} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderRadius: 10,
    height: interfaceHelper.deviceValue({ default: 56, xs: 49 }),
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 1.00,
    width: '100%',
  },
  small: {
    height: 40,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
});
