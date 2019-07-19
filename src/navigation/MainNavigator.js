import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainStack,
    Auth: AuthScreen,
  },
  {
    initialRouteName: 'Auth',
  }
));