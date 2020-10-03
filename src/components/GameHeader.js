import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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

  receiveStoreUpdate({ activity, user }) {
    this.setState({ user: user.user });
  }

  _openProfile = () => {
    navigationHelper.navigate('ProfileNavigator');
  }

  render() {
    const { user } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._openProfile} style={styles.profileButton}>
            <Image
              source={{ url: user.avatarUrl }}
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
    marginLeft: 16,
    marginRight: 56,
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
  profileButton: {

  },
  profileImage: {
    borderRadius: 10,
    height: 40,
    width: 40,
  },
});
