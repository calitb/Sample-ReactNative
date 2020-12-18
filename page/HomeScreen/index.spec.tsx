import * as ReduxActions from '../../redux/actions';
import * as ReduxHooks from '../../redux/useRedux';

import { Button, FlatList, Platform, Text, TextInput } from 'react-native';
import HomeScreen, { LoadingView } from "./index";
import { RootStackParamList, Routes } from '../../types';
import { characterMorty, characterRick } from "../../fixtures/character";
import mockNavigationGeneric, { ReturnValues } from "../../fixtures/navigation";

import CharacterListItem from '../../components/CharacterListItem';
import React from "react";
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { State } from "../../redux/reducer";
import TestRenderer from "react-test-renderer";
import { stateFixture } from "../../fixtures/state";

// function mockComponent<P extends React.DOMAttributes<T>, T extends Element>(name: string): (props: React.ClassAttributes<T> & P) => React.DOMElement<P, T> {
//   return (props: React.ClassAttributes<T> & P): React.DOMElement<P, T> => {
//     return React.createElement(name, props, props.children);
//   };
// }

// jest.mock('react-native', () => (
//   {
//     ...jest.requireActual("react-native"),
//     Button: mockComponent('Button')
//   }
// ));

describe("DetailScreen", () => {
  let stackMock: ReturnValues;
  let navigation: StackNavigationProp<RootStackParamList, Routes>;
  let route: Route<Routes.Home, undefined>;

  beforeEach(() => {
    stackMock = mockNavigationGeneric(Routes.Home);
    navigation = stackMock.navigation;
    route = stackMock.route as Route<Routes.Home, undefined>;
    Platform.OS = 'ios';
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

    const texts = root.findAllByType(Text);
    expect(texts).toHaveLength(3);
    expect(texts[1].props.children).toBe("1 of 10")

    const buttons = root.findAllByType(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.disabled).toBeTruthy();
    expect(buttons[1].props.disabled).toBeFalsy();

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

  it('should show a spinner while loading', () => {
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        characters: [],
        loading: true
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    // TIP: se debe usar asi en el componente:   ListEmptyComponent={loading ? () => <LoadingView /> : null}
    // const flatlist = root.findByType(FlatList)
    // expect(flatlist.props.ListEmptyComponent()).toStrictEqual(<LoadingView />)

    const loadingViews = root.findAllByType(LoadingView)
    expect(loadingViews).toHaveLength(1)

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

  it('should handle the pagination events', () => {
    const goBack = jest.fn();
    const goForward = jest.fn();
    const dispatch = jest.fn();

    const spyBack = jest.spyOn(ReduxActions, 'goBack').mockImplementation(goBack);
    const spyNext = jest.spyOn(ReduxActions, 'goForward').mockImplementation(goForward);
    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(dispatch);
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        pagination: { count: 10, page: 3, pages: 10, next: 4, prev: 2 },
      }
      return miSelector(state)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const buttons = root.findAllByType(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons[0].props.disabled).toBeFalsy();
    expect(buttons[1].props.disabled).toBeFalsy();

    buttons[0].props.onPress();
    expect(goBack).toBeCalled();
    expect(dispatch).toHaveBeenNthCalledWith(1, goBack())

    buttons[1].props.onPress();
    expect(goForward).toBeCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, goForward())

    spyBack.mockRestore();
    spyNext.mockRestore();
    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

  it('should display button to scroll to top in Android', () => {
    Platform.OS = 'android';

    const spyDispatch = jest.spyOn(ReduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const spySelector = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      return miSelector(stateFixture)
    })

    const { root } = TestRenderer.create(
      <HomeScreen navigation={navigation} route={route} />
    )

    const buttons = root.findAllByType(Button);
    expect(buttons).toHaveLength(3);
    expect(buttons[2].props.title).toBe("Scroll to top")

    spyDispatch.mockRestore();
    spySelector.mockRestore();
  })

})
