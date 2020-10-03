import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components';

import ProfileEditScreen from '../screens/ProfileEditScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator
      initialRouteName={'Profile'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene }) => <Header scene={scene} />,
      }}
    >
      <ProfileStack.Screen
        name={'ProfileEdit'}
        component={ProfileEditScreen}
        options={{
          backEnabled: true,
        }}
      />

      <ProfileStack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          closeEnabled: true,
          headerTransparent: true,
        }}
      />
    </ProfileStack.Navigator>
  );
};
