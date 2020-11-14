import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from 'react-native';

// se define que parametros recibe cada ruta
type RootStackParamList = {
  Home: {
    style?: ViewStyle;
  };
  Detail: {};
};

export type HomeScreennNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DetailScreennNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;
