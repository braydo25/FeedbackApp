import React, { Component } from 'react';
import { StyleSheet, Share } from 'react-native';
import Button from './Button';
import Card from './Card';
import TextField from './TextField';
import maestro from '../maestro';

const { userManager } = maestro.managers;

export default class ReferralCard extends Component {
  _sharePress = () => {
    Share.share({
      message: "Hey - Here's a link to Soundhouse. " +
               'Check it out to get feedback on your music and discover ' +
               `underground artists. https://www.getsoundhouse.com/${userManager.store.user.id}`,
    });
  }

  render() {
    const { style } = this.props;

    return (
      <Card style={[ styles.container, style ]}>
        <TextField
          editable={false}
          onChangeText={text => this.setState({ name: text })}
          returnKeyType={'done'}
          label={'Love Soundhouse? Share It To Level Up'}
          info={'Earn EXP from new users that join through your link.'}
          value={`getsoundhouse.com/${userManager.store.user.id}`}
          containerStyle={styles.textField}
        />

        <Button small onPress={this._sharePress}>Share My Link</Button>
      </Card>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textField: {
    marginBottom: 16,
  },
});
