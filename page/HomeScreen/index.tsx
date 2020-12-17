import { ActivityIndicator, Button, FlatList, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { goBack, goForward, loadCharacters } from "../../redux/actions";
import { useDispatch, useSelector } from '../../redux/useRedux';

import { Character } from "../../redux/reducer";
import CharacterListItem from "../../components/CharacterListItem";
import { HomeScreenStackProp } from "../../types";
import STRINGS from "../../strings";

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
          list.current?.scrollToOffset({ offset: 0, animated: false })
        }} title={STRINGS.PREV_BUTTON} />

        <Text>
          {STRINGS.formatString(STRINGS.PAGE_NUMBER, pagination.page, pagination.pages)}
        </Text>

        <Button disabled={!pagination.next} onPress={() => {
          dispatch(goForward())
          list.current?.scrollToOffset({ offset: 0, animated: false })
        }} title={STRINGS.NEXT_BUTTON} />
      </View>

      <View style={styles.searchbar}>
        <TextInput
          placeholder={STRINGS.FILTER_PLACEHOLDER}
          clearButtonMode="while-editing"
          value={search}
          onChangeText={onChangeSearch}
        />
      </View>

      <FlatList<Character>
        numColumns={3}
        ListEmptyComponent={loading ? <LoadingView /> : null}
        contentContainerStyle={loading ? { flex: 1, justifyContent: 'center' } : {}}
        ref={list}
        data={filteredCharacteres}
        renderItem={({ item }) => <CharacterListItem character={item} onPress={onPress} />}
        keyExtractor={(item, index) => item.id}
        ListFooterComponent={
          Platform.OS === 'android' ? <Button onPress={() => {
            list.current?.scrollToOffset({ offset: 0, animated: true })
          }} title={STRINGS.SCROLL_TO_TOP} /> : null
        }
      >
      </FlatList>

    </SafeAreaView>
  )
}

export function LoadingView() {
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
  buttons: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
