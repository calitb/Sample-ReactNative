import reducer, { initialState } from "./reducer";

import Actions from "./actions";
import { characterRick } from "../fixtures/character";

describe("SET_CHARACTER", () => {
  it("should set the character", () => {
    const newState = reducer(initialState, {
      type: 'SET_CHARACTER',
      character: characterRick
    })

    expect(newState).toStrictEqual({
      ...initialState,
      character: {
        id: "1",
        name: "Rick",
        image: "image.png",
        species: "Human",
        origin: "Earth"
      }
    })
  })
})

describe("SET_CHARACTERS", () => {
  it("should set the characters", () => {

    const newState = reducer(initialState, {
      type: 'SET_CHARACTERS',
      characters: [characterRick]
    })

    expect(newState).toStrictEqual({
      ...initialState,
      characters: [{
        id: "1",
        name: "Rick",
        image: "image.png",
        species: "Human",
        origin: "Earth"
      }]
    })
  })
})

describe("SET_PAGES_INFO", () => {
  it("should set the pages info", () => {
    const newState = reducer(initialState, {
      type: 'SET_PAGES_INFO',
      info: {
        count: 500,
        pages: 34,
        next: 2,
        prev: undefined
      },
      page: 1
    })

    expect(newState).toStrictEqual({
      ...initialState,
      pagination: {
        count: 500,
        pages: 34,
        next: 2,
        prev: undefined,
        page: 1
      }
    })
  })
  it("should update the pages info", () => {
    const action: Actions = {
      type: 'SET_PAGES_INFO',
      info: {
        count: 500,
        pages: 34,
        next: 3,
        prev: 1
      },
      page: 2
    };

    const newState = reducer({
      ...initialState,
      pagination: {
        count: 500,
        pages: 34,
        next: 2,
        prev: undefined,
        page: 1
      }
    }, action)

    expect(newState).toStrictEqual({
      ...initialState,
      pagination: {
        count: 500,
        pages: 34,
        next: 3,
        prev: 1,
        page: 2
      }
    })
  })
})


describe("SET_LOADING", () => {
  it("should set the loading state", () => {
    const newState = reducer(initialState, {
      type: 'SET_LOADING',
      loading: true
    })

    expect(newState).toStrictEqual({
      ...initialState,
      loading: true
    })
  })
  it("should set the loading state to false", () => {
    const newState = reducer({ ...initialState, loading: true }, {
      type: 'SET_LOADING',
      loading: false
    })

    expect(newState).toStrictEqual({
      ...initialState,
      loading: false
    })
  })
})
