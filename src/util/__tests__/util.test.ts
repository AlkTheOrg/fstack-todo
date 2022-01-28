import { combineClassNames } from "../combineClassNames";

test("combineClassNames should combine class names", () => {
  const input = ["isVisible", "class2", "class3"];
  expect(combineClassNames(input)).toEqual("isVisible class2 class3");
});
