import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GameHeader } from '../components';

import GameScreen from '../screens/GameScreen';

export default initialRouteName => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator
      initialRouteName={initialRouteName}
      headerMode={'float'}
    >
      <MainStack.Screen
        name={'Game'}
        component={GameScreen}
        options={{
          header: ({ scene }) => <GameHeader scene={scene} />,
          headerTransparent: true,
        }}
      />
    </MainStack.Navigator>
  );
};
