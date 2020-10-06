import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
          title: 'Track Feedback',
          backEnabled: true,
        }}
      />
    </NotificationsStack.Navigator>
  );
};
