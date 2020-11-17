import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useReducer } from 'react';

import { HomeScreenStackProp } from "../types";

interface State {
  contador: number;
}

interface Action {
  type: 'INCREMENTAR' //nombre
}

const initialState: State = {
  contador: 6
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return { ...state, contador: state.contador + 1 }
  }
}

interface Props extends HomeScreenStackProp { }

export default function HomeScreen(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <View style={[styles.container]} >
      <Text>{state.contador}</Text>
      <Button onPress={() => {
        dispatch({ type: 'INCREMENTAR' })
      }} title="Contar" />
      <Button onPress={() => {
        props.navigation.navigate("Detail", { contador: state.contador }); // nombre de la ruta, y los parametros
      }} title="Abrir detalle" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
