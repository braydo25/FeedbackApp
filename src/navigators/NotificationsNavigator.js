import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Header } from '../components';

import NotificationsScreen from '../screens/NotificationsScreen';
import TrackScreen from '../screens/TrackScreen';

export default () => {
  const NotificationsStack = createStackNavigator();

  return (
    <NotificationsStack.Navigator
      initialRouteName={'Notifications'}
      headerMode={'screen'}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        header: ({ scene }) => <Header scene={scene} />,
        headerTransparent: true,
      }}
    >
      <NotificationsStack.Screen
        name={'Notifications'}
        component={NotificationsScreen}
        options={{
          closeEnabled: true,
          title: 'Notifications',
        }}
      />

      <NotificationsStack.Screen
        name={'Track'}
        component={TrackScreen}
        options={{
          title: 'Track',
          backEnabled: true,
        }}
      />
    </NotificationsStack.Navigator>
  );
};
