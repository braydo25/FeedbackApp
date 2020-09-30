import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class ProfileCard extends Component {
  render() {
    const { style } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Image
          source={{ url: 'https://i1.sndcdn.com/avatars-s3HB5DUwmalQzzwL-n2iDNQ-t500x500.jpg' }}
          resizeMode={'contain'}
          style={styles.artistImage}
        />

        <View style={styles.card}>
          <Text style={styles.artistText}>EYERI MERINO</Text>

          <View style={styles.levelContainer}>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelText}>Level 24</Text>
              <Text style={styles.expText}>Exp 12,540</Text>
            </View>

            <View style={styles.levelBarOutline}>
              <View style={styles.levelBarFill} />
            </View>
          </View>
        </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: -40,
    paddingBottom: 30,
    paddingTop: 54,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
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

});
