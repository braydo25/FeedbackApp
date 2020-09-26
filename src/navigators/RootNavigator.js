import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';

export default props => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      initialRouteName={'MainNavigator'}
      mode={'modal'}
      headerMode={'none'}
    >
      <RootStack.Screen name={'MainNavigator'}>
        {() => MainNavigator(props.initialRouteName)}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};
