import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Card, Image, TextField } from '../components';
import maestro from '../maestro';

const { userManager } = maestro.managers;
const { navigationHelper, interfaceHelper } = maestro.helpers;
const windowWidth = Dimensions.get('window').width;

const onboardingItems = [
  {
    title: 'Welcome To Soundhouse',
    text: 'Hear what others think about your tracks, get feedback and discover new artists.',
  },
  {
    title: 'Grow by giving back',
    text: 'The more feedback you give, the more Soundhouse shows your tracks to others.',
  },
  {
    title: 'No fanbase? No problem',
    text: 'Soundhouse helps great artists grow while helping other artists improve.',
  },
];

export default class LandingScreen extends Component {
  state = {
    email: null,
    password: null,
    register: true,
    onboardingIndex: 0,
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

  _onScrollEnd = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;

    this.setState({ onboardingIndex: Math.floor(contentOffset.x / layoutMeasurement.width) });
  }

  render() {
    const { email, password, register, onboardingIndex, loading } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          extraHeight={270}
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <View style={[ styles.topContainerItem, styles.logoContainer ]}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
              />
            </View>

            <View style={styles.topContainerItem}>
              <ScrollView
                horizontal
                pagingEnabled
                onMomentumScrollEnd={this._onScrollEnd}
                showsHorizontalScrollIndicator={false}
                style={styles.onboardingScrollView}
              >
                {onboardingItems.map((onboardingItem, index) => (
                  <View key={index} style={styles.onboardingItem}>
                    <Text style={styles.onboardingItemTitleText}>{onboardingItem.title}</Text>
                    <Text style={styles.onboardingItemInfoText}>{onboardingItem.text}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.paginationContainer}>
                {onboardingItems.map((onboardingItem, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      (index === onboardingIndex) ? styles.paginationDotActive : null,
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Card style={styles.formCard}>
              <TextField
                onChangeText={text => this.setState({ email: text })}
                onSubmitEditing={() => this.passwordTextField.focus()}
                blurOnSubmit={false}
                returnKeyType={'next'}
                textContentType={'emailAddress'}
                autoCompleteType={'email'}
                autoCapitalize={'none'}
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

              <Button onPress={this._submit} loading={loading}>{register ? 'Sign Up' : 'Log In'}</Button>

              <View>
                <Text style={styles.bottomText}>{register ? 'Already' : 'Not'} signed up?</Text>
              </View>

              <TouchableOpacity
                loading={loading}
                onPress={() => this.setState({ register: !register })}
                style={styles.bottomButton}
              >
                <Text style={styles.bottomButtonText}>{register ? 'Login' : 'Sign Up'}</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </KeyboardAwareScrollView>

        <Image
          source={require('../assets/images/landing-background.png')}
          resizeMode={'cover'}
          blurRadius={39}
          style={styles.topContainerBackgroundImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  bottomButtonText: {
    color: '#563098',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
  },
  bottomText: {
    color: '#AAAAAA',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
  emailField: {
    marginBottom: 16,
  },
  formCard: {
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  keyIcon: {
    height: 20,
    marginLeft: 22,
    marginRight: -2,
    width: 20,
  },
  logoContainer: {
    paddingHorizontal: 32,
  },
  logoImage: {
    aspectRatio: 4.19,
    width: '100%',
  },
  onboardingItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    width: windowWidth,
  },
  onboardingItemInfoText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 16, xs: 14 }),
    letterSpacing: 0.1,
    lineHeight: interfaceHelper.deviceValue({ default: 22, xs: 19 }),
    opacity: 0.8,
    textAlign: 'center',
  },
  onboardingItemTitleText: {
    color: '#FFFFFF',
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: interfaceHelper.deviceValue({ default: 22, xs: 19 }),
    marginBottom: 8,
    textAlign: 'center',
  },
  onboardingScrollView: {
    minHeight: 100,
  },
  paginationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: interfaceHelper.deviceValue({ default: 10, xs: 20 }),
  },
  paginationDot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    opacity: 0.4,
    width: 8,
  },
  paginationDotActive: {
    opacity: 1,
  },
  passwordField: {
    marginBottom: 16,
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  topContainerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.75,
    zIndex: -1,
  },
  topContainerItem: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  userIcon: {
    height: 16,
    marginLeft: 22,
    width: 16,
  },
});
