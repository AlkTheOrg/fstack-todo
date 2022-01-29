export const getXDaysLater = (date: Date, x: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + x);
}
