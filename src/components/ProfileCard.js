import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Image from './Image';
import maestro from '../maestro';

const { levelsHelper } = maestro.helpers;

export default class ProfileCard extends Component {
  render() {
    const { user, style } = this.props;
    const relativeLevelExp = levelsHelper.relativeLevelExp(user.exp);
    const relativeNextLevelExp = levelsHelper.relativeExpForNextLevel(user.exp);

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ uri: user.avatarUrl }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <Card style={styles.card}>

          <Text style={styles.artistText}>{user.name}</Text>

          <View style={styles.levelContainer}>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelText}>Level {levelsHelper.expToLevel(user.exp)}</Text>
              <Text style={styles.expText}>Total Exp: {user.exp.toLocaleString()}</Text>
            </View>

            <View style={styles.levelBarOutline}>
              <View
                style={[
                  styles.levelBarFill,
                  { width: `${Math.floor((relativeLevelExp / relativeNextLevelExp) * 100)}%` },
                ]}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistImage: {
    borderColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    elevation: 4,
    height: 80,
    width: 80,
    zIndex: 1,
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
    width: '0%',
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
});
