import { StyleSheet, Text, View } from 'react-native';

import { DetailScreenStackProp } from "../types"
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

interface Props extends DetailScreenStackProp { }

export default function DetailScreen(props: Props) {
  const contador = props.route.params.contador;
  return (
    <View style={styles.container} >
      <Text>El valor es {contador}</Text>
    </View>
  )
}
