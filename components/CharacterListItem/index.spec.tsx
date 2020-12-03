import { Image, Text, TouchableOpacity } from "react-native"

import CharacterListItem from "./index"
import React from "react"
import TestRenderer from "react-test-renderer"
import { characterRick } from "../../fixtures/character"

describe("CharacterListItem", () => {
  it('should render the default component', () => {
    const { root } = TestRenderer.create(
      <CharacterListItem character={characterRick} onPress={jest.fn()} />
    )

    expect(root.findByType(Image).props.source).toStrictEqual({ uri: 'image.png' })
    expect(root.findByType(Text).props.children).toBe('Rick')
  })

  it('should call the onPress handler', () => {
    const handler = jest.fn()
    const { root } = TestRenderer.create(
      <CharacterListItem character={characterRick} onPress={handler} />
    )

    root.findByType(TouchableOpacity).props.onPress();

    expect(handler).toBeCalledWith(characterRick);
  })
})