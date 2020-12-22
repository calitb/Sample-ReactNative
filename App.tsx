import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, Route } from '@react-navigation/native';

import AboutNavigation from "./AboutNavigation";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MainNavigation from "./MainNavigation";
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import STRINGS from "./strings";
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from './redux/store';
import useAppState from './hooks/useAppState';

const Tab = createBottomTabNavigator();


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'teal',
  },
};

export default function App() {
  const appState = useAppState();
  console.log("State changed: ", { appState })

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}
        settings={{
          icon: props => <AwesomeIcon {...props} />,
        }}>

        <StatusBar style="dark" />
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: (props) => <Icon {...props} route={route} />
          })}
            tabBarOptions={{
              activeTintColor: 'blue',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={MainNavigation} options={{ title: STRINGS.HOME_TAB }} />
            <Tab.Screen name="About" component={AboutNavigation} options={{ title: STRINGS.INFO_TAB }} />
          </Tab.Navigator>
        </NavigationContainer>

      </PaperProvider>
    </ReduxProvider>
  );
}

interface IconProps {
  route: Route<string, object | undefined>,
  focused: boolean;
  color: string;
  size: number;
}

function Icon(props: IconProps): JSX.Element {
  let iconName = '';

  if (props.route.name === 'Home') {
    iconName = 'home';
  } else if (props.route.name === 'About') {
    iconName = 'info';
  }

  return <AwesomeIcon name={iconName} size={props.size} color={props.color} />;
}