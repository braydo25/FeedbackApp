import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import maestro from '../maestro';

const { navigationHelper } = maestro.helpers;

export default class ProfileCard extends Component {
  _openEditProfile = () => {
    navigationHelper.navigate('ProfileEdit');
  }

  render() {
    const { user, style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ url: user.avatarUrl }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <Card style={styles.card}>
          <TouchableOpacity onPress={this._openEditProfile} style={styles.settingsButton}>
            <Image source={require('../assets/images/settings.png')} style={styles.settingsIcon} />
          </TouchableOpacity>

          <Text style={styles.artistText}>{user.name}</Text>

          <View style={styles.levelContainer}>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelText}>Level 24</Text>
              <Text style={styles.expText}>Exp 12,540</Text>
            </View>

            <View style={styles.levelBarOutline}>
              <View style={styles.levelBarFill} />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderRadius: 20,
    height: 80,
    width: 80,
    zIndex: 2,
  },
  artistText: {
    color: '#04112A',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 18,
  },
  card: {
    alignItems: 'center',
    marginTop: -40,
    paddingBottom: 32,
    paddingTop: 54,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  expText: {
    color: '#B9AECA',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
  },
  levelBarFill: {
    backgroundColor: '#7C4BCE',
    borderRadius: 5,
    height: '100%',
    width: '25%',
  },
  levelBarOutline: {
    backgroundColor: 'rgba(124, 75, 206, 0.2)',
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
    marginTop: 20,
    width: '80%',
  },
  levelText: {
    color: '#7C4BCE',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
  levelTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: '#7C4BCE',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 32,
    top: 16,
    width: 40,
  },
  settingsIcon: {
    height: 20,
    width: 20,
  },
});
