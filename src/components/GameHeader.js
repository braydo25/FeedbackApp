import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class GameHeader extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../data/pics/profile.png')}
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
  profileButton: {

  },
  profileImage: {
    borderRadius: 10,
    height: 40,
    width: 40,
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
  levelText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 14,
  },
  levelExpText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 12,

  },
});
