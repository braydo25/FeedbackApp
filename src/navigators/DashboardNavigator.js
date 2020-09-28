import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';

export default () => {
  const ActivityStack = createStackNavigator();

  return (
    <ActivityStack.Navigator
      initialRouteName={'Dashboard'}
      headerMode={'screen'}
    >
      <ActivityStack.Screen
        name={'Dashboard'}
        component={DashboardScreen}
      />
    </ActivityStack.Navigator>
  );
};
