import { getXDaysLater } from "../util/getXDaysLater";
import { Todo } from "../slices/todoSlice";

const now: Date = new Date(Date.now());

export const mockTodos: Todo[] = [
  { id: "0", color: "red", due: new Date(2021, 10, 11), name: "Buy milk", pageId: "0"},
  { id: "1", color: "green", due: new Date(now), name: "Lorem ips", pageId: "0"},
  { id: "2", color: "brown", due: getXDaysLater(now, 1), name: "Mipsu lor", pageId: "0"},
  { id: "3", color: "#123232", due: getXDaysLater(now, 2), name: "Lorem, ipsum1", pageId: "0"},
  { id: "4", color: "#111", due: getXDaysLater(now, 3), name: "Lorem, ipsum2", pageId: "0"},
  { id: "5", color: "#888", due: getXDaysLater(now, 7), name: "fdsafd fsd sa", pageId: "0"},
  { id: "6", color: "#942", due: getXDaysLater(now, 14), name: "d asdsda ", pageId: "0"},
  { id: "7", color: "#a0f", due: getXDaysLater(now, 21), name: "fdsfds", pageId: "0"},
  { id: "8", color: "#120864", due: getXDaysLater(now, 30), name: "Get the meat from John", pageId: "0"},
  { id: "9", color: "orange", due: getXDaysLater(now, 31), name: "Buy milk mid", pageId: "0"},
  { id: "10", color: "purple", due: getXDaysLater(now, 60), name: "Buy groc", pageId: "0"},
  { id: "11", color: "#123232", due: getXDaysLater(now, 60), name: "Buy food", pageId: "0"},
  { id: "12", color: "#120864", due: getXDaysLater(now, 80), name: "Buy tea", pageId: "0"},
  { id: "13", color: "red", due: getXDaysLater(now, 90), name: "Buy coffea", pageId: "0"},
  { id: "14", color: "red", due: getXDaysLater(now, 790), name: "Buy milk last", pageId: "0"},
]
