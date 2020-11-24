import 'react-native-gesture-handler';

import DetailScreen from "./DetailScreen"
import HomeScreen from "./HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
