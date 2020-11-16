import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { HomeScreenStackProp } from "../types";

interface Props extends HomeScreenStackProp { }

export default function HomeScreen(props: Props) {
  const [contador, setContador] = useState(0);

  return (
    <View style={[styles.container]} >
      <Text>{contador}</Text>
      <Button onPress={() => {
        setContador(contador + 1)
      }} title="Contar" />
      <Button onPress={() => {
        props.navigation.navigate("Detail", { contador }); // nombre de la ruta, y los parametros
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
