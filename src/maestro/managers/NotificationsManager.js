import { Manager } from 'react-native-maestro';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default class NotificationsManager extends Manager {
  static get instanceKey() {
    return 'notificationsManager';
  }

  static initialStore = {
    notifications: null,
  }

  get storeName() {
    return 'notifications';
  }

  async loadNotifications() {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.get({
      path: '/notifications',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this.updateStore({ notifications: response.body });

    return response.body;
  }
}
