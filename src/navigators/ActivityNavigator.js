import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components';

import ActivityScreen from '../screens/ActivityScreen';

export default () => {
  const ActivityStack = createStackNavigator();

  return (
    <ActivityStack.Navigator
      initialRouteName={'Activity'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene }) => <Header scene={scene} />,
        headerTransparent: true,
      }}
    >
      <ActivityStack.Screen
        name={'Activity'}
        component={ActivityScreen}
        options={{
          closeEnabled: true,
          title: 'Activity',
        }}
      />
    </ActivityStack.Navigator>
  );
};
