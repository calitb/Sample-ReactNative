import { ActivityIndicator, Button, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
    <SafeAreaView style={[styles.container]} >
      <View style={styles.buttons}>
        <Button disabled={!pagination.prev} onPress={() => {
          dispatch(goBack())
        }} title="Anterior" />


        <Button disabled={!pagination.next} onPress={() => {
          dispatch(goForward())
        }} title="Siguiente" />
      </View>

      <FlatList<Character>
        numColumns={3}
        ListEmptyComponent={<NoData />}
        ref={list}
        style={[styles.scroll]}
        data={characters}
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
  buttons: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
