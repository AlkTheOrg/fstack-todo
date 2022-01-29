import { combineClassNames } from "../combineClassNames";
import { getXDaysLater } from "../getXDaysLater";

describe("combinClassNames", () => {
  it("should combine class names", () => {
    const input = ["isVisible", "class2", "class3"];
    expect(combineClassNames(input)).toEqual("isVisible class2 class3");
  });
  
  it("should return an empty string when the array is empty", () => {
    expect(combineClassNames([])).toEqual("");
  });
})

describe("getXDaysLater", () => {
  it("should return one X days later", () => {
    const date = new Date(2000, 11, 20);
    const X = 7;
    expect(getXDaysLater(date, X)).toEqual(new Date(
      date.getFullYear(), date.getMonth(), date.getDate() + X
    ))
  })
})
