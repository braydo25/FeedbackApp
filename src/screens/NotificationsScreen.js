import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Image, Notification } from '../components';
import maestro from '../maestro';

const { notificationsManager, userManager } = maestro.managers;

export default class NotificationsScreen extends Component {
  state = {
    notifications: null,
  }

  componentDidMount() {
    maestro.link(this);

    this._loadNotifications();
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ notifications }) {
    this.setState({ notifications: notifications.notifications });
  }

  _loadNotifications = async () => {
    return notificationsManager.loadNotifications();
  }

  _renderItem = ({ item, index }) => {
    return (
      <Notification notification={item} />
    );
  }

  render() {
    const { notifications } = this.state;
    const { user } = userManager.store;

    return (
      <View style={styles.container}>
        {!notifications && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'#000000'} size={'large'} />
          </View>
        )}

        {!!notifications && (
          <FlatList
            data={notifications}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => `${item.id}`}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            style={styles.container}
          />
        )}

        <Image
          source={{ uri: user.avatarUrl }}
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
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
