import * as ReduxHooks from '../../redux/useRedux'

import { Image, ScrollView, Text } from "react-native"

import DetailScreen from "./index"
import React from "react"
import { State } from "../../redux/reducer"
import TestRenderer from "react-test-renderer"
import { characterRick } from "../../fixtures/character"
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


    const { root } = TestRenderer.create(
      <DetailScreen navigation={{
        setOptions: jest.fn()
      }} />
    )

    const scrollViews = root.findAllByType(ScrollView)
    expect(scrollViews).toHaveLength(1);

    const imagen = root.findByType(Image)
    expect(imagen.props.source).toStrictEqual({ uri: 'image.png' })

    const texts = root.findAllByType(Text)
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toBe('Human')
    expect(texts[1].props.children).toBe('Earth')

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


    const { root } = TestRenderer.create(
      <DetailScreen navigation={{
        setOptions: jest.fn()
      }} />
    )

    const scrollViews = root.findAllByType(ScrollView)
    expect(scrollViews).toHaveLength(0);

    spy.mockRestore();
  })
})