import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GameHeader } from '../components';

import GameScreen from '../screens/GameScreen';
import LandingScreen from '../screens/LandingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SetupNotificationsScreen from '../screens/SetupNotificationsScreen';
import SetupProfileScreen from '../screens/SetupProfileScreen';
import SetupTrackScreen from '../screens/SetupTrackScreen';

export default initialRouteName => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator
      initialRouteName={initialRouteName}
      headerMode={'screen'}
    >
      <MainStack.Screen
        name={'Game'}
        component={GameScreen}
        options={{
          header: ({ scene }) => <GameHeader scene={scene} />,
          headerTransparent: true,
        }}
      />

      <MainStack.Screen
        name={'Landing'}
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'Onboarding'}
        component={OnboardingScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'SetupNotifications'}
        component={SetupNotificationsScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'SetupProfile'}
        component={SetupProfileScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'SetupTrack'}
        component={SetupTrackScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};
