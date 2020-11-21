import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Character } from "../../redux/store"
import React from "react";

interface Prop {
  character: Character;
  onPress: (character: Character) => void
}

export default function CharacterListItem({ onPress, character }: Prop) {
  return (
    <TouchableOpacity onPress={() => { onPress(character) }} activeOpacity={0.6} >
      <View style={styles.container} >
        <Text>{character.name}</Text>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      width: Dimensions.get('window').width - 10,
      height: 100,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: 'gray',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40
    }
  }
)