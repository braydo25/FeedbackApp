import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import DashboardNavigator from './DashboardNavigator';
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
        name={'DashboardNavigator'}
        component={DashboardNavigator}
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
