import * as ReduxActions from '../../redux/actions'
import * as ReduxHooks from '../../redux/useRedux'

import { ActivityIndicator, Button, FlatList, Text, TextInput } from 'react-native';
import HomeScreen, { LoadingView } from "./index"
import { RootStackParamList, Routes } from '../../types'
import { characterMorty, characterRick } from "../../fixtures/character"
import mockNavigationGeneric, { ReturnValues } from "../../fixtures/navigation"

import CharacterListItem from '../../components/CharacterListItem';
import React from "react"
import { Route } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { State } from "../../redux/reducer"
import TestRenderer from "react-test-renderer"
import { stateFixture } from "../../fixtures/state"

describe("DetailScreen", () => {

  let stackMock: ReturnValues;
  let navigation: StackNavigationProp<RootStackParamList, Routes>;
  let route: Route<Routes.Home, undefined>;

  beforeEach(() => {
    stackMock = mockNavigationGeneric(Routes.Home);
    navigation = stackMock.navigation;
    route = stackMock.route as Route<Routes.Home, undefined>;
  })

  it('should render the default component, with no characters', () => {
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        characters: []
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const flatlist = root.findByType(FlatList)
    expect(flatlist.props.data).toStrictEqual([])

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

  it('should fetch the characters on load', () => {
    const dispatch = jest.fn();
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(dispatch);

    const loadCharacters = jest.fn();
    const spyLoadCharacters = jest.spyOn(ReduxActions, 'loadCharacters').mockReturnValue(loadCharacters);

    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        characters: []
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    TestRenderer.act(() => {

    })

    expect(dispatch).toBeCalledWith(loadCharacters);

    spyLoadCharacters.mockRestore();
    spyDispatch.mockRestore();
    spySelector.mockRestore();
  });

  it('should render the component with characters and initial pagination', () => {
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const flatlist = root.findByType(FlatList)
    expect(flatlist.props.data).toStrictEqual([{
      id: '1',
      name: 'Rick',
      image: 'image.png',
      species: 'Human',
      origin: 'Earth',
    }])

    expect(flatlist.props.ListEmptyComponent).toBe(null)

    const item = root.findByType(CharacterListItem)
    expect(item.props.character).toStrictEqual({
      id: '1',
      name: 'Rick',
      image: 'image.png',
      species: 'Human',
      origin: 'Earth',
    });

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

  it('should filter characters', () => {
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        characters: [characterRick, characterMorty]
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    let flatlist = root.findByType(FlatList)
    expect(flatlist.props.data).toHaveLength(2)

    TestRenderer.act(() => {
      root.findByType(TextInput).props.onChangeText('ri');
    })

    expect(flatlist.props.data).toStrictEqual([{
      id: '1',
      name: 'Rick',
      image: 'image.png',
      species: 'Human',
      origin: 'Earth',
    }])

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

  it.skip('should show a spinner while loading', () => {
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        loading: true
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const flatlist = root.findByType(FlatList)
    expect(flatlist.props.ListEmptyComponent).toStrictEqual(<LoadingView />)

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

  it('should navigate to the Details', () => {
    const dispatch = jest.fn();
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(dispatch);
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        characters: [characterRick, characterMorty]
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const items = root.findAllByType(CharacterListItem)
    items[0].props.onPress(characterRick);

    expect(dispatch).toBeCalledWith({
      type: 'SET_CHARACTER', character: {
        id: '1',
        name: 'Rick',
        image: 'image.png',
        species: 'Human',
        origin: 'Earth',
      }
    })
    expect(navigation.navigate).toBeCalledWith("Detail")

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

})