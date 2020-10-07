import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Button, Image, TextField } from '../components';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { navigationHelper, interfaceHelper } = maestro.helpers;

export default class LandingScreen extends Component {
  state = {
    email: null,
    password: null,
    register: true,
    loading: false,
    error: null,
  }

  passwordTextField = null;

  _submit = async () => {
    const { email, password } = this.state;

    try {
      if (!email) {
        throw new Error('Please enter an email address.');
      }

      if (!password) {
        throw new Error('Please enter a password');
      }

      this.setState({ loading: true });

      await userManager.login({ email, password });

      navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
    } catch (error) {
      interfaceHelper.showError({ message: error.message });
      this.setState({ loading: false });
    }
  }

  render() {
    const { email, password, register, loading } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}
      >
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.logoText}>SoundHouse Alpha Demo</Text>
          </View>

          <Image
            source={require('../assets/images/landing-background.png')}
            resizeMode={'cover'}
            blurRadius={39}
            style={styles.topContainerBackgroundImage}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TextField
            onChangeText={text => this.setState({ email: text })}
            onSubmitEditing={() => this.passwordTextField.focus()}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCompleteType={'email'}
            keyboardType={'email-address'}
            placeholder={'Email Address'}
            inputPrefix={<Image source={require('../assets/images/user.png')} style={styles.userIcon} />}
            containerStyle={styles.emailField}
            value={email}
          />

          <TextField
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            returnKeyType={'done'}
            placeholder={'Password'}
            inputPrefix={<Image source={require('../assets/images/key.png')} style={styles.keyIcon} />}
            containerStyle={styles.passwordField}
            value={password}
            ref={component => this.passwordTextField = component}
          />

          <Button onPress={this._submit}>{register ? 'Sign Up' : 'Login'}</Button>

          <View>
            <Text style={styles.bottomText}>{register ? 'Already' : "Don't"} have an account?</Text>
          </View>

          <TouchableOpacity
            loading={loading}
            onPress={() => this.setState({ register: !register })}
            style={styles.bottomButton}
          >
            <Text style={styles.bottomButtonText}>{register ? 'Login' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    paddingVertical: 8,
  },
  bottomButtonText: {
    color: '#563098',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1.2,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  bottomText: {
    color: '#AAAAAA',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 16,
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  emailField: {
    marginBottom: 16,
  },
  keyIcon: {
    height: 20,
    marginLeft: 22,
    marginRight: -2,
    width: 20,
  },
  logoText: {
    color: '#573491',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: 24,
  },
  passwordField: {
    marginBottom: 24,
  },
  topContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 32,
  },
  topContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  userIcon: {
    height: 16,
    marginLeft: 22,
    width: 16,
  },
});
