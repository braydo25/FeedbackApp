import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ActivityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the activity screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
