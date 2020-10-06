import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import NotificationsNavigator from './NotificationsNavigator';
import ProfileNavigator from './ProfileNavigator';
import MainNavigator from './MainNavigator';
import UploadTrackNavigator from './UploadTrackNavigator';

export default props => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      initialRouteName={'MainNavigator'}
      mode={'modal'}
      headerMode={'none'}
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <RootStack.Screen
        name={'NotificationsNavigator'}
        component={NotificationsNavigator}
      />

      <RootStack.Screen
        name={'ProfileNavigator'}
        component={ProfileNavigator}
      />

      <RootStack.Screen name={'MainNavigator'}>
        {() => MainNavigator(props.initialRouteName)}
      </RootStack.Screen>

      <RootStack.Screen
        name={'UploadTrackNavigator'}
        component={UploadTrackNavigator}
      />
    </RootStack.Navigator>
  );
};
