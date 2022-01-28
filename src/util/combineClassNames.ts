export const combineClassNames: (classes: string[]) => string = (classes) => {
  if (!classes.length) return "";
  return classes.reduce((prev, cur) => prev + " " + cur);
};
