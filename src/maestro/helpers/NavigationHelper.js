import { Helper } from 'react-native-maestro';
import { StackActions, CommonActions } from '@react-navigation/native';

export default class NavigationHelper extends Helper {
  static get instanceKey() {
    return 'navigationHelper';
  }

  _navigation = null;

  pop(numberOfScreens = 1) {
    this._navigation.dispatch(StackActions.pop(numberOfScreens));
  }

  push(routeName, params) {
    this._navigation.dispatch(StackActions.push(routeName, params));
  }

  reset(routeName, params) {
    this._navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params: { animationEnabled: false, ...params },
          },
        ],
      }),
    );
  }

  replace(routeName, params) {
    this._navigation.dispatch(StackActions.replace(routeName, params));
  }

  navigate(routeName, params) {
    this._navigation.dispatch(CommonActions.navigate({
      name: routeName,
      params,
    }));
  }

  resetRoot(routeName, params) {
    this.maestro.dispatchEvent('ROOT_NAVIGATION_RESET', { routeName, params });
  }

  setNavigation(navigation) {
    this._navigation = navigation;
  }
}
