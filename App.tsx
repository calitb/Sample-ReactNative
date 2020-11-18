import 'react-native-gesture-handler';

import React, { createContext } from 'react';

import Action from "./redux/actions"
import DetailScreen from "./DetailScreen"
import HomeScreen from "./HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import { State } from './redux/store';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import useRedux from "./redux/useRedux";

const Stack = createStackNavigator();

interface MyContextProps {
  state: State,
  dispatch: React.Dispatch<Action>
}

export const MyContext = createContext<MyContextProps>({})

export default function App() {
  const [state, dispatch] = useRedux();

  return (
    <MyContext.Provider value={{ state, dispatch }}>
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
