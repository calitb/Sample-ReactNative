import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MainNavigation from "./MainNavigation";
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'teal',
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}
        settings={{
          icon: props => <AwesomeIcon {...props} />,
        }}>
        <MainNavigation />
      </PaperProvider>
    </ReduxProvider>
  );
}
