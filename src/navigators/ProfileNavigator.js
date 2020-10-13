import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Header } from '../components';

import ProfileEditScreen from '../screens/ProfileEditScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrackScreen from '../screens/TrackScreen';

export default () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator
      initialRouteName={'Profile'}
      headerMode={'screen'}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        header: ({ scene }) => <Header scene={scene} />,
        headerTransparent: true,
      }}
    >
      <ProfileStack.Screen
        name={'ProfileEdit'}
        component={ProfileEditScreen}
        options={{
          backEnabled: true,
          title: 'Edit Profile',
          rightButtonTitle: 'Save',
        }}
      />

      <ProfileStack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          closeEnabled: true,
        }}
      />

      <ProfileStack.Screen
        name={'Track'}
        component={TrackScreen}
        options={{
          title: 'Track Feedback',
          backEnabled: true,
        }}
      />
    </ProfileStack.Navigator>
  );
};
