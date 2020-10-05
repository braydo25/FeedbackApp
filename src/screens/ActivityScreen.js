import React, { Component } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Notification } from '../components';
import maestro from '../maestro';

const { userManager } = maestro.managers;

export default class ActivityScreen extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <Notification />
    );
  }

  render() {
    const { user } = userManager.store;

    return (
      <View style={styles.container}>
        <FlatList
          data={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]}
          renderItem={this._renderItem}
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        />

        <Image
          source={{ url: user.avatarUrl }}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.backgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 80,
  },
});
