import { Manager } from 'react-native-maestro';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const APNS_TOKEN_KEY = 'APNS_TOKEN';
const FCM_REGISTRATION_ID_KEY = 'FCM_REGISTRATION_ID';
const NOTIFICATIONS_PERMISSION_REQUESTED_KEY = 'NOTIFICATIONS_PERMISSION_REQUESTED';
const NOTIFICATIONS_PERMISSION_STATUS_KEY = 'NOTIFICATIONS_PERMISSION_STATUS';

export default class NotificationsManager extends Manager {
  static get instanceKey() {
    return 'notificationsManager';
  }

  static initialStore = {
    notifications: null,
    apnsToken: null,
    fcmRegistrationId: null,
    permissionRequested: false,
    permissionDeferred: false,
    permissionStatus: null,
    hasNewNotifications: false,
  }

  constructor(maestro) {
    super(maestro);

    const { asyncStorageHelper, navigationHelper } = maestro.helpers;

    asyncStorageHelper.getItem(APNS_TOKEN_KEY).then(apnsToken => {
      this.updateStore({ apnsToken });
    });

    asyncStorageHelper.getItem(FCM_REGISTRATION_ID_KEY).then(fcmRegistrationId => {
      this.updateStore({ fcmRegistrationId });
    });

    asyncStorageHelper.getItem(NOTIFICATIONS_PERMISSION_REQUESTED_KEY).then(permissionRequested => {
      this.updateStore({ permissionRequested });
    });

    asyncStorageHelper.getItem(NOTIFICATIONS_PERMISSION_STATUS_KEY).then(permissionStatus => {
      this.updateStore({ permissionStatus }); // TODO: check permission can delay, so we need to cache to prevent weird races
    });

    this.checkAndSyncPermission();

    Notifications.addNotificationReceivedListener(() => this.setHasNewNotifications(true));
    Notifications.addNotificationResponseReceivedListener(() => {
      const { userManager } = maestro.managers;

      if (userManager.store.user) {
        navigationHelper.push('NotificationsNavigator');
      }
    });

    setInterval(() => {
      // temporary until we have websocket or mqtt..
      const { userManager } = maestro.managers;

      if (userManager.store.user) {
        try {
          this.loadNotifications();
        } catch (error) { /* Noop */ }
      }
    }, 10000);
  }

  get storeName() {
    return 'notifications';
  }

  async loadNotifications() {
    const { apiHelper } = this.maestro.helpers;
    const { userManager } = this.maestro.managers;
    const response = await apiHelper.get({
      path: '/notifications',
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this.updateStore({
      notifications: response.body,
    });

    if (!!response.body?.length && response.body[0].createdAt > userManager.store.user.viewedNotificationsAt) {
      this.setHasNewNotifications(true);
    }

    return response.body;
  }

  async requestPermission() {
    const { asyncStorageHelper } = this.maestro.helpers;

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    asyncStorageHelper.setItem(NOTIFICATIONS_PERMISSION_REQUESTED_KEY, true);
    this._syncPermissionStatus(status);

    if (status === 'granted') {
      const token = (await Notifications.getDevicePushTokenAsync()).data;
      this._registerForNotifications(token);
    }

    this.updateStore({ permissionRequested: true });

    this.maestro.dispatchEvent('NOTIFICATIONS:PROMPT_COMPLETE');
  }

  async checkAndSyncPermission() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    this._syncPermissionStatus(status);

    return status;
  }

  deferPermission() {
    this.updateStore({ permissionDeferred: true });
  }

  permissionDeferred() {
    return !!this.store.permissionDeferred;
  }

  permissionGranted() {
    const { store } = this;

    return store.permissionStatus === 'granted' && (store.apnsToken || store.fcmRegistrationId);
  }

  permissionRequested() {
    return !!this.store.permissionRequested;
  }

  setHasNewNotifications(boolean) {
    this.updateStore({ hasNewNotifications: boolean });
  }

  /*
   * Helpers
   */

  _registerForNotifications = token => {
    const { asyncStorageHelper } = this.maestro.helpers;
    const apnsToken = (Platform.OS === 'ios') ? token : null;
    const fcmRegistrationId = (Platform.OS === 'android') ? token : null;

    this.updateStore({ apnsToken, fcmRegistrationId });

    asyncStorageHelper.setItem(APNS_TOKEN_KEY, apnsToken);
    asyncStorageHelper.setItem(FCM_REGISTRATION_ID_KEY, fcmRegistrationId);

    this.maestro.dispatchEvent('NOTIFICATIONS:REGISTERED', token);
  }

  _syncPermissionStatus = permissionStatus => {
    const { asyncStorageHelper } = this.maestro.helpers;

    asyncStorageHelper.setItem(NOTIFICATIONS_PERMISSION_STATUS_KEY, permissionStatus);

    this.updateStore({ permissionStatus });
  }
}
