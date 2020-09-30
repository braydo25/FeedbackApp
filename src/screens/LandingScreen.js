import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { navigationHelper } = maestro.helpers;

export default class LandingScreen extends Component {
  state = {
    email: null,
    password: null,
    login: false,
    register: false,
    loading: false,
    error: null,
  }

  _submit = async () => {
    const { login, register } = this.state;

    if (login) {
      return this._login();
    }

    if (register) {
      return this._register();
    }

    this._testEmail();
  }

  _testEmail = async () => {
    const { email } = this.state;

    this.setState({ loading: true });

    try {
      const testEmailResponse = await userManager.register(email);

      this.setState({
        login: testEmailResponse.code === 403,
        register: testEmailResponse.code === 200,
        loading: false,
        error: '',
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  _login = async () => {
    const { email, password } = this.state;

    this.setState({ loading: true });

    try {
      await userManager.login({ email, password });

      navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  _register = async () => {
    const { password } = this.state;

    this.setState({ loading: true });

    try {
      await userManager.updateUser({ password });

      navigationHelper.resetRoot(userManager.nextRouteNameForUserState());
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  render() {
    const { email, password, login, register, loading, error } = this.state;

    return (
      <View style={styles.container}>
        {(login || register) && (
          <Text>{login ? 'Login To Your Account' : 'Create An Account'}</Text>
        )}

        <TextInput
          onChangeText={text => this.setState({ email: text })}
          placeholder={'Enter Your Email'}
          value={email}
        />

        {(login || register) && (
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            placeholder={'Enter A Password'}
            value={password}
          />
        )}

        <TouchableOpacity disabled={loading} onPress={this._submit}>
          <Text>Continue</Text>
        </TouchableOpacity>

        {!!error && (
          <Text>{error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
