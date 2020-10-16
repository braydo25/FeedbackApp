import React, { Component } from 'react';
import { Animated, StatusBar, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import { LaunchLoading, OverlaysContainer } from './components';
import RootNavigator from './navigators/RootNavigator';
import maestro from './maestro';

TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

const { userManager } = maestro.managers;
const { appUpdatesHelper, navigationHelper } = maestro.helpers;

export default class App extends Component {
  state = {
    fontsLoaded: false,
    checkedForUpdates: false,
    initialRouteName: 'Landing',
    containerOpacityAnimated: new Animated.Value(0),
  }

  async componentDidMount() {
    maestro.link(this);

    this._loadFonts();
    this._checkForUpdates();

    await userManager.store.ready;

    this.setState({
      initialRouteName: userManager.nextRouteNameForUserState(),
    }, () => {
      setTimeout(() => this._toggleVisibility(true), 750);
    });
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  async receiveEvent(name, data) {
    if (name === 'ROOT_NAVIGATION_RESET') {
      await this._toggleVisibility(false);

      await new Promise(resolve => {
        this.setState({ initialRouteName: data.routeName }, resolve);
      });

      this._toggleVisibility(true);
    }
  }

  _loadFonts = async () => {
    try {
      await loadAsync({
        'SFProDisplay-Medium': require('./assets/fonts/SFProDisplay-Medium.otf'),
        'SFProDisplay-Regular': require('./assets/fonts/SFProDisplay-Regular.otf'),
        'SFProDisplay-SemiBold': require('./assets/fonts/SFProDisplay-SemiBold.otf'),
      });
    } catch (error) { /* NOOP */ }

    this.setState({ fontsLoaded: true });
  }

  _checkForUpdates = async () => {
    await appUpdatesHelper.update();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    this.setState({ checkedForUpdates: true });
  }

  _toggleVisibility = show => {
    return new Promise(resolve => {
      Animated.timing(this.state.containerOpacityAnimated, {
        toValue: (show) ? 1 : 0,
        duration: 750,
        useNativeDriver: true,
      }).start(resolve);
    });
  }

  render() {
    const { initialRouteName, containerOpacityAnimated, fontsLoaded, checkedForUpdates } = this.state;

    if (!fontsLoaded || !checkedForUpdates) {
      return <LaunchLoading />;
    }

    return (
      <Animated.View style={[ styles.container, { opacity: containerOpacityAnimated } ]}>
        <NavigationContainer
          theme={{ colors: { background: '#FFFFFF' } }}
          ref={navigation => navigationHelper.setNavigation(navigation)}
          key={`navigation_base_${initialRouteName}`}
        >
          <StatusBar barStyle={'light-content'} />
          <RootNavigator initialRouteName={initialRouteName} />
          <OverlaysContainer />
        </NavigationContainer>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
});
