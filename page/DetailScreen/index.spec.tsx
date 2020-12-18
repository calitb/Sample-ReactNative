import * as ReduxHooks from '../../redux/useRedux'

import { Card, Paragraph } from 'react-native-paper'

import DetailScreen from "./index"
import React from "react"
import { Route } from '@react-navigation/native'
import { Routes } from '../../types'
import { ScrollView } from "react-native"
import { State } from "../../redux/reducer"
import TestRenderer from "react-test-renderer"
import { characterRick } from "../../fixtures/character"
import mockNavigationGeneric from "../../fixtures/navigation"
import { stateFixture } from "../../fixtures/state"

describe("DetailScreen", () => {
  it('should render the default component', () => {
    // const spy = jest.spyOn(ReduxHooks, 'useSelector').mockReturnValue(characterRick)
    const spy = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture,
        character: characterRick
      }
      return miSelector(state)
    })

    const stackMock = mockNavigationGeneric(Routes.Detail);;
    const navigation = stackMock.navigation;
    const route = stackMock.route as Route<Routes.Detail, undefined>;
    navigation.setOptions = jest.fn();

    const { root } = TestRenderer.create(
      <DetailScreen navigation={navigation} route={route} />
    )

    const scrollViews = root.findAllByType(ScrollView)
    expect(scrollViews).toHaveLength(1);

    const imagen = root.findByType(Card.Cover)
    expect(imagen.props.source).toStrictEqual({ uri: 'image.png' })

    const texts = root.findAllByType(Paragraph)
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children.join("")).toBe('Specie: Human')
    expect(texts[1].props.children.join("")).toBe('Origin: Earth')

    expect(navigation.setOptions).toBeCalledWith({
      title: 'Rick',
    })

    spy.mockRestore();
  })

  it('should render nothing when there is not character selected', () => {
    // const spy = jest.spyOn(ReduxHooks, 'useSelector').mockReturnValue(undefined)
    const spy = jest.spyOn(ReduxHooks, 'useSelector').mockImplementation((miSelector) => {
      const state: State = {
        ...stateFixture
      }
      return miSelector(state)
    })

    const stackMock = mockNavigationGeneric(Routes.Detail);;
    const navigation = stackMock.navigation;
    const route = stackMock.route as Route<Routes.Detail, undefined>;

    const { root } = TestRenderer.create(
      <DetailScreen navigation={navigation} route={route} />
    )

    const scrollViews = root.findAllByType(ScrollView)
    expect(scrollViews).toHaveLength(0);

    spy.mockRestore();
  })
})