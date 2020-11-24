import { initialState } from "./reducer"
import reducer from "./reducer";

describe("SET_CHARACTER", () => {
  it("should set the character", () => {
    const newState = reducer(initialState, { type: "SET_CHARACTER", character: { id: "1", name: "Rick", image: "image.png" } })

    expect(newState).toStrictEqual({
      ...initialState,
      character: { id: "1", name: "Rick", image: "image.png" }
    })
  })
})