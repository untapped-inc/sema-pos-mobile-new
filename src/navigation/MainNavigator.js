import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import AuthHeader from '../components/headers/AuthHeader';

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AuthStack = createStackNavigator(
  { Authentication: AuthScreen },
  {
    defaultNavigationOptions: {
      header: props => <AuthHeader headerProps={props} />,
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));