import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Card extends Component {
  render() {
    const { children, style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
});
