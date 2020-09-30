import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class OnboardingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is an onboarding screen</Text>
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
