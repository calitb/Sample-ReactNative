import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { HomeScreenStackProp } from "../types";
import { MyContext } from "../App"
import useRedux from "../redux/useRedux";

interface Props extends HomeScreenStackProp { }

export default function HomeScreen(props: Props) {
  const [state, dispatch] = useRedux();
  const contexto = useContext(MyContext);

  return (
    <View style={[styles.container]} >
      <Text>{state.contador}</Text>
      <Text>Mi Coontexto es:   {contexto.name}</Text>
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
