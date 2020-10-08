import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import Image from './Image';
import maestro from '../maestro';

const { navigationHelper, interfaceHelper, levelsHelper } = maestro.helpers;
const { userManager } = maestro.managers;

export default class GameHeader extends Component {
  state = {
    user: userManager.store.user,
    hasTrack: false,
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ user, tracks }) {
    const oldExp = this.state.user.exp;
    const newExp = user.user.exp;

    if (newExp !== oldExp) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

      if (levelsHelper.expToLevel(newExp) !== levelsHelper.expToLevel(oldExp)) {
        interfaceHelper.showOverlay({ name: 'LevelUp', data: { delay: 500 } });
      }
    }

    if (tracks.tracks?.length) {
      this.setState({ hasTrack: true });
    }

    this.setState({ user: user.user });
  }

  _openNotifications = () => {
    navigationHelper.navigate('NotificationsNavigator');
  }

  _openProfile = () => {
    navigationHelper.navigate('ProfileNavigator');
  }

  render() {
    const { user, hasTrack } = this.state;
    const relativeLevelExp = levelsHelper.relativeLevelExp(user.exp);
    const relativeNextLevelExp = levelsHelper.relativeExpForNextLevel(user.exp);

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._openProfile}>
            <Image
              source={{ uri: user?.avatarUrl }}
              resizeMode={'contain'}
              style={styles.profileImage}
            />

            {!hasTrack && (
              <View style={styles.notificationsBubble} />
            )}
          </TouchableOpacity>

          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {levelsHelper.expToLevel(user.exp)}</Text>

            <View style={styles.levelBarOutline}>
              <View
                style={[
                  styles.levelBarFill,
                  { width: `${Math.floor((relativeLevelExp / relativeNextLevelExp) * 100)}%` },
                ]}
              />
            </View>

            <Text style={styles.levelExpText}>{relativeLevelExp}/{relativeNextLevelExp} EXP</Text>
          </View>

          <TouchableOpacity onPress={this._openNotifications} style={styles.notificationsButton}>
            <Image
              source={require('../assets/images/bell.png')}
              resizeMode={'contain'}
              style={styles.notificationsIcon}
            />

            {true && (
              <View style={styles.notificationsBubble} />
            )}
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
    width: '0%',
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
    borderColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    height: 12,
    position: 'absolute',
    right: -4,
    top: -4,
    width: 12,
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
