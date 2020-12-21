import 'react-native-gesture-handler';

import DetailScreen from "./page/DetailScreen";
import HomeScreen from "./page/HomeScreen";
import React from 'react';
import STRINGS from "./strings";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: STRINGS.formatString(STRINGS.TITLE, 'Rick', 'Morty') as string }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerBackTitle: STRINGS.BACK_BUTTON }} />
    </Stack.Navigator>
  );
}
