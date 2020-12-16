import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import DetailScreen from "./page/DetailScreen"
import HomeScreen from "./page/HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import STRINGS from "./strings"
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store'

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'teal',
    accent: 'yellow',
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}
        settings={{
          icon: props => <AwesomeIcon {...props} />,
        }}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: STRINGS.formatString(STRINGS.TITLE, 'Rick', 'Morty') as string }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerBackTitle: 'Back' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
