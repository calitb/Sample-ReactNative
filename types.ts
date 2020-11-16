import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// se define que parametros recibe cada ruta
type RootStackParamList = {
  Home: {};
  Detail: {
    contador: number;
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
