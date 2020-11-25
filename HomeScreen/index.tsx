import { Button, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../redux/useRedux'

import { Character } from "../redux/reducer"
import CharacterListItem from "../components/CharacterListItem"
import { HomeScreenStackProp } from "../types";
import { loadCharacters } from "../redux/actions"

export default function HomeScreen(props: HomeScreenStackProp) {
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()

  const list = useRef<FlatList<Character>>(null);

  useEffect(() => {
    dispatch(loadCharacters())
  }, [])

  function onPress(character: Character) {
    dispatch({ type: 'SET_CHARACTER', character })
    props.navigation.navigate("Detail")
  }

  return (
    <View style={[styles.container]} >
      <Button onPress={() => {
        list.current?.scrollToEnd()
      }} title="Scrollear al final" />

      <FlatList<Character>
        numColumns={3}
        ref={list}
        style={[styles.scroll]}
        data={characters}
        renderItem={({ item }) => <CharacterListItem character={item} onPress={onPress} />}
        keyExtractor={(item, index) => item.id}
      >
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  }
});
