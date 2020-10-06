import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;
const { userManager } = maestro.managers;

export default class GameHeader extends Component {
  state = {
    user: userManager.store.user,
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ user }) {
    this.setState({ user: user.user });
  }

  _openNotifications = () => {
    navigationHelper.navigate('NotificationsNavigator');
  }

  _openProfile = () => {
    navigationHelper.navigate('ProfileNavigator');
  }

  render() {
    const { user } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._openProfile}>
            <Image
              source={{ uri: user?.avatarUrl }}
              resizeMode={'contain'}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level 24</Text>

            <View style={styles.levelBarOutline}>
              <View style={styles.levelBarFill} />
            </View>

            <Text style={styles.levelExpText}>150/500 EXP</Text>
          </View>

          <TouchableOpacity onPress={this._openNotifications} style={styles.notificationsButton}>
            <Image
              source={require('../assets/images/bell.png')}
              resizeMode={'contain'}
              style={styles.notificationsIcon}
            />

            <View style={styles.notificationsBubble} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
  },
  levelBarFill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: '100%',
    width: '25%',
  },
  levelBarOutline: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    height: 6,
    marginVertical: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.00,
    width: '100%',
  },
  levelContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  levelExpText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 12,
  },
  levelText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
  notificationsBubble: {
    backgroundColor: '#FF0000',
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    right: 9,
    top: 6,
    width: 10,
  },
  notificationsButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  notificationsIcon: {
    height: 20,
    width: 20,
  },
  profileImage: {
    borderRadius: 10,
    height: 40,
    width: 40,
  },
});
