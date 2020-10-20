import React, { PureComponent } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Image, Notification } from '../components';
import maestro from '../maestro';

const { notificationsManager, userManager } = maestro.managers;
const { appStoreReviewHelper, interfaceHelper } = maestro.helpers;

export default class NotificationsScreen extends PureComponent {
  state = {
    notifications: null,
  }

  async componentDidMount() {
    maestro.link(this);

    userManager.updateUser({ viewedNotificationsAt: new Date() });
    notificationsManager.setBadgeCount(0);

    const notifications = await this._loadNotifications();

    if (notifications?.length >= 3) {
      appStoreReviewHelper.requestRating();
    }
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ notifications }) {
    this.setState({ notifications: notifications.notifications });
  }

  _loadNotifications = async () => {
    try {
      return notificationsManager.loadNotifications();
    } catch (error) {
      interfaceHelper.showError({ message: 'Failed to load notifications. Retrying..' });
      setTimeout(this._loadNotifications, 2500);
    }
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
    height: '100%',
    opacity: 0.5,
    width: '100%',
    zIndex: -1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
    paddingHorizontal: 12,
    paddingTop: 80,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
