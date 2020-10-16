import { AppState } from 'react-native';
import { Manager } from 'react-native-maestro';

export default class AppManager extends Manager {
  static get instanceKey() {
    return 'appManager';
  }

  static initialStore = {
    state: 'active',
  }

  constructor(maestro) {
    super(maestro);

    AppState.addEventListener('change', nextAppState => {
      if (this.store.state !== nextAppState) {
        this.updateStore({ state: nextAppState });
        this.maestro.dispatchEvent('APP_STATE_CHANGED', nextAppState);
      }
    });
  }

  get storeName() {
    return 'appState';
  }
}
