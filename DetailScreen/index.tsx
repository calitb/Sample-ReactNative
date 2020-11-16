import { DetailScreenNavigationProp, DetailScreenRouteProp } from "../types"
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

interface Props {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

export default function DetailScreen(props: Props) {
  const contador = props.route.params.contador;
  return (
    <View style={styles.container} >
      <Text>El valor es {contador}</Text>
    </View>
  )
}
