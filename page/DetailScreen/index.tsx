import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';

import { DetailScreenStackProp } from "../../types"
import { useSelector } from '../../redux/useRedux'

export default function DetailScreen(props: DetailScreenStackProp) {
  const character = useSelector(state => state.character)

  if (!character) {
    return null;
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: character.name,
    });
  }, [props.navigation]);

  return (
    <ScrollView style={styles.container} >
      <Image source={{ uri: character.image }} style={styles.image} />

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