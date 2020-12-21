import 'react-native-gesture-handler';

import AboutScreen from "./page/AboutScreen";
import React from 'react';
import STRINGS from "./strings";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AboutNavigation() {
  return (
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen name="About" component={AboutScreen} options={{ title: STRINGS.ABOUT_TITLE }} />
    </Stack.Navigator>
  );
}
