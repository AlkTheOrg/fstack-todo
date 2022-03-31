import { createSlice } from "@reduxjs/toolkit";

export type PageSettingsState = {
  isSidebarDetached: boolean
}

export const initialState: PageSettingsState = {
  isSidebarDetached: true
}

export const pageSettingsSlice = createSlice({
  name: "pageSettings",
  initialState,
  reducers: {
    detachModeToggled: (state) => {
      state.isSidebarDetached = !state.isSidebarDetached;
    }
  }
});

export const { detachModeToggled } = pageSettingsSlice.actions;
export default pageSettingsSlice.reducer;
