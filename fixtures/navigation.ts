import { RootStackParamList, Routes } from '../types';

import { Route } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

/*

COMO USAR
    const stackMock = mockNavigationGeneric(Routes.Detail);;
    const navigation = stackMock.navigation;
    const route = stackMock.route as Route<Routes.Detail, undefined>;


    <Routes.Detail, undefined>   
        Routes.Detail es el nombre de la ruta
        undefined son los parametros que recibe la ruta
*/

export interface ReturnValues {
  navigation: StackNavigationProp<RootStackParamList, Routes>;
  route: Route<Routes, undefined>;
}

export default function mockNavigationGeneric(routeName: Routes, routeParams?: any): ReturnValues {
  const route: Route<Routes, undefined> = { key: 'random-key', name: routeName, params: routeParams };

  const navigation: StackNavigationProp<RootStackParamList, Routes> = {
    canGoBack: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    isFocused: jest.fn(),
  };

  return { navigation, route };
}
