import { Image, ScrollView, StyleSheet, Text } from 'react-native';

import { DetailScreenStackProp } from "../types"
import React from 'react';
import { useSelector } from '../redux/useRedux'

export default function DetailScreen(props: DetailScreenStackProp) {
  const character = useSelector(state => state.character)

  if (!character) {
    return null;
  }

  return (
    <ScrollView style={styles.container} >
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.text}>{character.name}</Text>

      <Text style={styles.subtext}>{character.species}</Text>
      <Text style={styles.subtext}>{character.origin}</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  subtext: {
    fontSize: 18,
    textAlign: 'center'
  }
});