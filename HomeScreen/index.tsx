import { Button, StyleSheet, Text, View } from 'react-native';

import { HomeScreenStackProp } from "../types";
import React from 'react';
import useRedux from "../redux/useRedux"

interface Props extends HomeScreenStackProp { }

export default function HomeScreen(props: Props) {
  const { state, dispatch } = useRedux();

  return (
    <View style={[styles.container]} >
      <Text>Numero de personajes: {state.characters.length}
        {JSON.stringify(state.characters)}
      </Text>
      <Button onPress={() => {
        dispatch({ type: 'FETCH_CHARACTERS' })
      }} title="Contar" />
      <Button onPress={() => {
        props.navigation.navigate("Detail", { contador: 0 }); // nombre de la ruta, y los parametros
      }} title="Abrir detalle" />

      <MyView>
        <Text>Hello</Text>
      </MyView>

    </View>
  )
}

interface MyViewProps {
  children: React.ReactNode;
}

function MyView(props: MyViewProps) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray', width: 160, height: 160, borderRadius: 80 }}>
      {props.children}
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
