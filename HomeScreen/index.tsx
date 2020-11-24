import { Button, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { Character } from "../redux/store"
import CharacterListItem from "../components/CharacterListItem"
import { HomeScreenStackProp } from "../types";
import { fetchCharacters } from "../redux/actions"
import useRedux from "../redux/useRedux"

export default function HomeScreen(props: HomeScreenStackProp) {
  const { state, dispatch } = useRedux();
  const list = useRef<FlatList<Character>>(null);

  useEffect(() => {
    dispatch(fetchCharacters())
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
        data={state.characters}
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
