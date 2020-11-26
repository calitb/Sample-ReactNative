import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { goBack, goForward, loadCharacters } from "../redux/actions"
import { useDispatch, useSelector } from '../redux/useRedux'

import { Character } from "../redux/reducer"
import CharacterListItem from "../components/CharacterListItem"
import { HomeScreenStackProp } from "../types";

export default function HomeScreen(props: HomeScreenStackProp) {
  const characters = useSelector(state => state.characters)
  const pagination = useSelector(state => state.pagination)
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
      <Text>{JSON.stringify(pagination)}</Text>

      <Button disabled={!pagination.prev} onPress={() => {
        dispatch(goBack())
      }} title="Anterior" />


      <Button disabled={!pagination.next} onPress={() => {
        dispatch(goForward())
      }} title="Siguiente" />

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
