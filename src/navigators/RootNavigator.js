import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardNavigator from './DashboardNavigator';
import MainNavigator from './MainNavigator';

export default props => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      initialRouteName={'MainNavigator'}
      mode={'modal'}
      headerMode={'none'}
    >
      <RootStack.Screen
        name={'DashboardNavigator'}
        component={DashboardNavigator}
      />

      <RootStack.Screen name={'MainNavigator'}>
        {() => MainNavigator(props.initialRouteName)}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};
