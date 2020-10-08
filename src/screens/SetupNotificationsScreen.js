import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Button, Card, Image } from '../components';
import maestro from '../maestro';

const { userManager, notificationsManager } = maestro.managers;
const { navigationHelper } = maestro.helpers;

export default class SetupNotificationsScreen extends Component {
  state = {
    failed: !notificationsManager.permissionGranted() && notificationsManager.permissionRequested(),
  }

  componentDidMount() {
    console.log(notificationsManager.permissionGranted());
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  async receiveEvent(name, value) {
    if (name === 'NOTIFICATIONS:PROMPT_COMPLETE') {
      this._next();
    }

    if (name === 'APP_STATE_CHANGED' && value === 'active') {
      await notificationsManager.checkAndSyncPermission();

      if (notificationsManager.permissionGranted()) {
        this._next();
      }
    }
  }

  _enableNotifications = () => {
    if (!this.state.failed) {
      notificationsManager.requestPermission();
    } else {
      Linking.openURL('app-settings:');
    }
  }

  _next = () => {
    notificationsManager.deferPermission();
    navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
  }

  render() {
    const { failed } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require('../assets/images/bell.png')}
            style={styles.bellImage}
          />

          <Text style={styles.titleText}>Keep me posted</Text>
          <Text style={styles.infoText}>Find out when you receive new feedback on your tracks.</Text>
        </View>

        <View style={styles.formContainer}>
          <Card style={styles.formCard}>
            <Button onPress={this._enableNotifications}>
              {(!failed) ? 'Enable Notifications' : 'Fix Notification Settings'}
            </Button>

            <TouchableOpacity onPress={this._next} style={styles.notNowButton}>
              <Text style={styles.notNowButtonText}>Not Now</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <Image
          source={require('../assets/images/landing-background.png')}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.topContainerBackgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bellImage: {
    height: 150,
    width: 150,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  formCard: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
    letterSpacing: 0.4,
    marginBottom: 16,
    textAlign: 'center',
  },
  notNowButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 16,
    width: '100%',
  },
  notNowButtonText: {
    color: '#AAAAAA',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 16,
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 24,
    marginBottom: 8,
    marginTop: 32,
    textAlign: 'center',
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  topContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.75,
    zIndex: -1,
  },
});
