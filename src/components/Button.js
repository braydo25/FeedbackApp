import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {
  render() {
    const { children, style, ...props } = this.props;

    return (
      <TouchableOpacity style={[ styles.container, style ]} {...props}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
  },
});
