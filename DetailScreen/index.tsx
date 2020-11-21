import { StyleSheet, Text, View } from 'react-native';

import { DetailScreenStackProp } from "../types"
import React from 'react';
import useRedux from "../redux/useRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function DetailScreen(props: DetailScreenStackProp) {
  const { state } = useRedux();

  return (
    <View style={styles.container} >
      <Text>El valor es {JSON.stringify(state.character)}</Text>
    </View>
  )
}
