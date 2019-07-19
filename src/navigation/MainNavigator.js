import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AuthStack = createStackNavigator(
  { Authentication: AuthScreen },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2858a7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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