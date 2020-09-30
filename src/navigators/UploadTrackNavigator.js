import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../components';

import UploadTrackScreen from '../screens/UploadTrackScreen';

export default () => {
  const UploadTrackStack = createStackNavigator();

  return (
    <UploadTrackStack.Navigator
      initialRouteName={'UploadTrack'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene }) => <Header scene={scene} />,
      }}
    >
      <UploadTrackStack.Screen
        name={'UploadTrack'}
        component={UploadTrackScreen}
        options={{
          closeEnabled: true,
          headerTransparent: true,
        }}
      />
    </UploadTrackStack.Navigator>
  );
};
