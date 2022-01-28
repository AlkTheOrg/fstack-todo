export const combineClassNames: (classes: string[]) => string = (classes) => {
  return classes.reduce((prev, cur) => prev + " " + cur);
}
