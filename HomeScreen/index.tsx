import { Button, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { Character } from "../redux/store"
import CharacterListItem from "../components/CharacterListItem"
import { HomeScreenStackProp } from "../types";
import useRedux from "../redux/useRedux"

export default function HomeScreen(props: HomeScreenStackProp) {
  const { state, dispatch } = useRedux();
  const list = useRef<FlatList<Character>>();

  useEffect(() => {
    dispatch({ type: 'FETCH_CHARACTERS' })
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
