import 'react-native-gesture-handler';

import React, { createContext } from 'react';

import DetailScreen from "./DetailScreen"
import HomeScreen from "./HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

interface MyContextProps {
  name: string;
}

const initialValues: MyContextProps = {
  name: "Carlos"
}

export const MyContext = createContext<MyContextProps>(initialValues)

export default function App() {
  return (
    <MyContext.Provider value={initialValues}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}
