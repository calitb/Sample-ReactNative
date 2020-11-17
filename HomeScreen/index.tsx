import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useReducer } from 'react';

import { HomeScreenStackProp } from "../types";
import { incrementar } from "../redux/actions"
import reducer from "../redux/reducer"
import store from "../redux/store";

interface Props extends HomeScreenStackProp { }

export default function HomeScreen(props: Props) {
  const [state, dispatch] = useReducer(reducer, store)

  return (
    <View style={[styles.container]} >
      <Text>{state.contador}</Text>
      <Button onPress={() => {
        dispatch(incrementar())
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
