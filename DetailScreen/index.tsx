import { StyleSheet, Text, View } from 'react-native';

import { DetailScreenStackProp } from "../types"
import React from 'react';
import { useSelector } from '../redux/useRedux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function DetailScreen(props: DetailScreenStackProp) {
  const character = useSelector(state => state.character)

  return (
    <View style={styles.container} >
      <Text>El valor es {JSON.stringify(character)}</Text>
    </View>
  )
}
