import { StackScreenProps } from '@react-navigation/stack';

// se define que parametros recibe cada ruta
type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

export type HomeScreenStackProp = StackScreenProps<RootStackParamList, 'Home'>;

export type DetailScreenStackProp = StackScreenProps<RootStackParamList, 'Detail'>;
