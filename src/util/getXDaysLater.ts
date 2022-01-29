export const getXDaysLater: (date: Date, x: number) => Date = (date, x) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + x);
}
