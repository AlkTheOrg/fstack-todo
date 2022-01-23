import reducer, {
  setAuth,
  resetAuth,
  initialState,
  AuthState,
} from "../authSlice";
import { Action } from "@reduxjs/toolkit";

it("should return the initial state on undefined state passed", () => {
  expect(reducer(undefined, {} as Action)).toEqual(initialState);
});

it("should set auth", () => {
  const prevState: AuthState = initialState;
  const newState: AuthState = { ...prevState, name: "new auth" };
  expect(reducer(prevState, setAuth(newState))).toEqual(newState);
});

it("should reset auth", () => {
  const prevState: AuthState = {
    id: "1",
    name: "asdf",
    token: "1287fdDSF89#$",
  };
  expect(reducer(prevState, resetAuth)).toEqual(initialState);
});
