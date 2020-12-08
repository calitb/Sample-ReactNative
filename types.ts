import { StackScreenProps } from '@react-navigation/stack';

// se define que parametros recibe cada ruta
export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

export enum Routes {
  Home = 'Home',
  Detail = 'Detail',
}

export type HomeScreenStackProp = StackScreenProps<RootStackParamList, Routes.Home>;

export type DetailScreenStackProp = StackScreenProps<RootStackParamList, Routes.Detail>;
