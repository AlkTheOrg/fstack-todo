export const elementContainsTarget = (elementSelector: string, target: Element) => {
  const element = document.querySelector(elementSelector);
  return element && element.contains(target);
};
