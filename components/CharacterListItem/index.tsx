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
        <View style={styles.content} >
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.text}>{character.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      width: Dimensions.get('screen').width / 3,
      paddingHorizontal: 5,
      paddingVertical: 5
    },
    content: {
      flex: 1,
      borderColor: 'black',
      borderWidth: 1,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
    text: {
      textAlign: 'center'
    }
  }
)