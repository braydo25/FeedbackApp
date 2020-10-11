import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { interfaceHelper } = maestro.helpers;

const tips = [
  "If your feedback is marked as useful by a track’s artist, you'll get a major EXP boost!",
  'The higher level you are, the more SoundHouse will prioritize showing your tracks to others to listen to and give feedback on. Level up by giving feedback to others!',
  "Working on a track idea but don't quite have it finished? Add your work in progress tracks to SoundHouse to get ideas from others!",
  "Earn EXP to level up by listening to and giving feedback on others' tracks.",
  'When you add a new track to SoundHouse, use the description of your track as a way to communicate with others who listen to it and give feedback on it.',
  'Connect with the SoundHouse team! Follow us on social media! @soundhouse',
  'SoundHouse was built as a way for any musician or producer to be heard and get feedback on their music.',
];

export default class GameTrackCardTip extends Component {
  state = {
    tipIndex: 0,
  }

  componentDidMount() {
    this.setState({ tipIndex: Math.floor(Math.random() * tips.length) });
  }

  render() {
    const { tipIndex } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Here's a tip...</Text>
        </View>

        <View>
          <Text style={styles.tipText}>{tips[tipIndex]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: '100%',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  tipText: {
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: interfaceHelper.deviceValue({ default: 14, xs: 13 }),
    lineHeight: 20,
    marginTop: 8,
  },
  titleText: {
    color: '#7D4CCF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
});
