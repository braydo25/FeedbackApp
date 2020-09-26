import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../screens/GameScreen';

export default initialRouteName => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator
      initialRouteName={initialRouteName}
      headerMode={'none'}
    >
      <MainStack.Screen
        name={'Game'}
        component={GameScreen}
      />
    </MainStack.Navigator>
  );
};
