import { Platform } from 'react-native';
import { Manager } from 'react-native-maestro';

const LOGGED_IN_USER_KEY = 'LOGGED_IN_USER';

let resolveInitialReadyPromise = null;

export default class UserManager extends Manager {
  static get instanceKey() {
    return 'userManager';
  }

  static initialStore = {
    user: null,
    ready: new Promise(resolve => resolveInitialReadyPromise = resolve),
  }

  constructor(maestro) {
    super(maestro);

    const { asyncStorageHelper } = this.maestro.helpers;

    this.updateStore({
      ready: asyncStorageHelper.getItem(LOGGED_IN_USER_KEY).then(user => {
        this._setLoggedInUser(user);
        resolveInitialReadyPromise();
      }),
    });
  }

  get storeName() {
    return 'user';
  }

  receiveEvent(name, value) {
    if (name === 'NOTIFICATIONS:REGISTERED') {
      this._updateUserDevice();
    }
  }

  async login({ email, password }) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: '/users',
      data: { email, password },
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this._setLoggedInUser(response.body);
  }

  async register(email) {
    const { apiHelper } = this.maestro.helpers;
    const response = await apiHelper.post({
      path: '/users',
      data: { email },
    });

    if (![ 200, 403 ].includes(response.code)) {
      throw new Error(response.body);
    }

    if (response.code === 200) {
      this._setLoggedInUser(response.body);
    }

    return response;
  }

  async updateUser(fields) {
    const { apiHelper } = this.maestro.helpers;
    const { avatarImageUri, ...data } = fields;

    const response = (avatarImageUri) ? await apiHelper.uploadFiles({
      method: 'PATCH',
      path: '/users/me',
      files: [
        {
          key: 'avatar',
          uri: avatarImageUri,
          name: avatarImageUri.substring(avatarImageUri.lastIndexOf('/') + 1),
        },
      ],
      data,
    }) : await apiHelper.patch({
      path: '/users/me',
      data,
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    this._updateLocalUser(response.body);
  }

  nextRouteNameForUserState() {
    const { user } = this.store;

    if (!user) {
      return 'Landing';
    }

    if (!user.name) {
      return 'SetupProfile';
    }

    if (Platform.OS === 'ios') {
      return 'SetupIOSNotifications';
    }

    return 'Game';
  }

  logout() {
    const { navigationHelper } = this.maestro.helpers;

    this._setLoggedInUser(null);

    navigationHelper.resetRoot('Landing');
  }

  /*
   * Helpers
   */

  _setLoggedInUser(user) {
    this._updateLocalUser(user);
    this._updateUserDevice();
  }

  _updateLocalUser(user) {
    const { asyncStorageHelper } = this.maestro.helpers;

    user = (this.store.user && user) ? { ...this.store.user, ...user } : user;

    this.updateStore({ user });

    asyncStorageHelper.setItem(LOGGED_IN_USER_KEY, user);
  }

  async _updateUserDevice() {
    const { apiHelper, deviceHelper } = this.maestro.helpers;

    if (!this.store.user) {
      return;
    }

    await apiHelper.put({
      path: '/devices',
      data: {
        uuid: await deviceHelper.getUUID(),
        details: await deviceHelper.getDeviceDetails(),
      },
    });
  }
}
