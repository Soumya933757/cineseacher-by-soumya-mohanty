import dayjs from "dayjs";
import { modifyBy, removeBy } from "neetocist";
import { assoc, maxBy, reduce } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryItemStore = create(
  persist(
    set => ({
      lastSelectedItem: {},
      historyItems: [],
      setLastSelectedItem: () =>
        set(state => ({
          lastSelectedItem: reduce(
            maxBy(element => element.date),
            { date: 0 },
            state.historyItems
          ),
        })),
      addHistoryItem: item =>
        set(state => ({ historyItems: [item, ...state.historyItems] })),
      updateHistoryItem: item =>
        set(state => ({
          historyItems: modifyBy(
            { imdbID: item.imdbID },
            element => assoc("date", dayjs().valueOf(), element),
            state.historyItems
          ),
        })),
      removeHistoryItem: id =>
        set(state => ({
          historyItems: removeBy({ imdbID: id }, state.historyItems),
        })),

      clearHistory: () => set({ historyItems: [] }),
    }),
    { name: "history-items-store" }
  )
);

export default useHistoryItemStore;
