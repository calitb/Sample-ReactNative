import { ActivityIndicator, Button, FlatList, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { goBack, goForward, loadCharacters } from "../redux/actions"
import { useDispatch, useSelector } from '../redux/useRedux'

import { Character } from "../redux/reducer"
import CharacterListItem from "../components/CharacterListItem"
import { HomeScreenStackProp } from "../types";

export default function HomeScreen(props: HomeScreenStackProp) {
  const [search, setSearch] = useState('');
  const characters = useSelector(state => state.characters)
  const pagination = useSelector(state => state.pagination)
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()

  const filteredCharacteres = characters.filter((character) => character.name.toUpperCase().startsWith(search.toUpperCase()));

  const list = useRef<FlatList<Character>>(null);

  useEffect(() => {
    dispatch(loadCharacters())
  }, [])

  function onPress(character: Character) {
    dispatch({ type: 'SET_CHARACTER', character })
    props.navigation.navigate("Detail")
  }

  function onChangeSearch(text: string) {
    setSearch(text);
  }

  return (
    <SafeAreaView style={[styles.container]} >
      <View style={styles.buttons}>
        <Button disabled={!pagination.prev} onPress={() => {
          dispatch(goBack())
        }} title="Anterior" />

        <Button disabled={!pagination.next} onPress={() => {
          dispatch(goForward())
        }} title="Siguiente" />
      </View>

      <View style={styles.searchbar}>
        <TextInput
          value={search}
          style={styles.inputfield}
          onChangeText={onChangeSearch}
        />
      </View>

      <FlatList<Character>
        numColumns={3}
        ListEmptyComponent={loading ? <NoData /> : null}
        ref={list}
        style={[styles.scroll]}
        data={filteredCharacteres}
        renderItem={({ item }) => <CharacterListItem character={item} onPress={onPress} />}
        keyExtractor={(item, index) => item.id}
        ListFooterComponent={
          Platform.OS === 'android' ? <Button onPress={() => {
            list.current?.scrollToOffset({ offset: 0, animated: true })
          }} title="Scrollear al inicio" /> : null
        }
      >
      </FlatList>


    </SafeAreaView>
  )
}

function NoData() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  searchbar: {
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    height: 44,
    justifyContent: 'center'
  },
  inputfield: {

  },
  buttons: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
