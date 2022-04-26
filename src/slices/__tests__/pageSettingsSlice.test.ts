import { Action } from "@reduxjs/toolkit";
import reducer, {
  detachModeToggled,
  PageSettingsState,
  initialState,
} from "../pageSettingsSlice";

describe("pageSettingsSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("should toggle the detach mode", () => {
    const prevState: PageSettingsState = { isSidebarDetached: false };
    expect(reducer(prevState, detachModeToggled())).toEqual({
      ...prevState,
      isSidebarDetached: !prevState.isSidebarDetached,
    });
  });
});
