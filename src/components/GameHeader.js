import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import AvatarButton from './AvatarButton';
import Image from './Image';
import maestro from '../maestro';

const { playbackManager, userManager } = maestro.managers;
const { navigationHelper, interfaceHelper, levelsHelper } = maestro.helpers;

export default class GameHeader extends PureComponent {
  state = {
    user: userManager.store.user,
    hasNoTracks: false,
    hasNewNotifications: false,
  }

  componentDidMount() {
    maestro.link(this);
  }

  componentWillUnmount() {
    maestro.unlink(this);
  }

  receiveStoreUpdate({ user, tracks, notifications }) {
    const oldExp = this.state.user.exp;
    const newExp = user.user.exp;

    if (newExp !== oldExp) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

      if (levelsHelper.expToLevel(newExp) > levelsHelper.expToLevel(oldExp)) {
        interfaceHelper.showOverlay({ name: 'LevelUp', data: { delay: 500 } });
      }
    }

    this.setState({
      user: user.user,
      hasNoTracks: (tracks.tracks && !tracks.tracks.length),
      hasNewNotifications: notifications.hasNewNotifications,
    });
  }

  _openNotifications = () => {
    playbackManager.pause();
    navigationHelper.navigate('NotificationsNavigator');
  }

  _openProfile = () => {
    playbackManager.pause();
    navigationHelper.navigate('ProfileNavigator', {
      screen: 'Profile',
      params: { userId: userManager.store.user.id },
    });
  }

  render() {
    const { user, hasNoTracks, hasNewNotifications } = this.state;
    const relativeLevelExp = levelsHelper.relativeLevelExp(user.exp);
    const relativeNextLevelExp = levelsHelper.relativeExpForNextLevel(user.exp);

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <AvatarButton
              user={user}
              onPress={() => playbackManager.pause()}
              style={styles.avatarButton}
            />

            {hasNoTracks && (
              <View style={styles.notificationsBubble} />
            )}
          </View>

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

            {hasNewNotifications && (
              <View style={styles.notificationsBubble} />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  avatarButton: {
    borderRadius: 10,
    height: 40,
    width: 40,
  },
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
    height: interfaceHelper.deviceValue({ default: 6, xs: 5 }),
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
    fontSize: interfaceHelper.deviceValue({ default: 12, xs: 11 }),
  },
  levelText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
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
});
