import { SortOrder } from "../slices/todoSlice";

export const sortByKey = <T, K extends keyof T>(
  records: T[],
  key: K,
  order: SortOrder = "asc"
) => {
  const [val1, val2] = order === "desc" ? [1, -1] : [-1, 1];
  const recordsCopy = [...records];
  return recordsCopy.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? val1 : x > y ? val2 : 0;
  });
};
