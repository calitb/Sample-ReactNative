import { Button, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { HomeScreennNavigationProp } from "../types";

type Props = {
  navigation: HomeScreennNavigationProp;
};

export default function HomeScreen(props: Props) {
  const [contador, setContador] = useState(0);
  const value = useRef("hola mundo")

  useHook();

  useEffect(() => {
    console.log("entro a useEffect")
    return () => {
      console.log("libero memoria del useEffect")
    }
  })

  return (
    <View style={[styles.container]} >
      <Text>{value.current}</Text>
      <Text>{contador}</Text>
      <Button onPress={() => {
        props.navigation.navigate("Detail", {}); // nombre de la ruta, y los parametros
      }} title="Abrir detalle" />
    </View>
  )
}

function useHook() {
  useEffect(() => {
    console.log("arranco el componente")
    return () => {
      console.log("murió el componente")
    }
  }, [])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
