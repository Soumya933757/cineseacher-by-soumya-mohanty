import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryItemStore = create(
  persist(
    set => ({
      active: {},
      historyItems: [],
      setItemActive: () =>
        set(state => ({
          active: state.historyItems.reduce(
            (latest, item) => (item.date > latest.date ? item : latest),
            { date: 0 }
          ),
        })),
      addHistoryItem: item =>
        set(state => ({ historyItems: [item, ...state.historyItems] })),
      updateHistoryItem: item =>
        set(state => ({
          historyItems: state.historyItems.map(ele => {
            if (ele.imdbID === item.imdbID) return { ...ele, date: Date.now() };

            return ele;
          }),
        })),
      removeHistoryItem: id =>
        set(state => ({
          historyItems: state.historyItems.filter(item => item.imdbID !== id),
        })),
      clearHistory: () => set({ historyItems: [] }),
    }),
    { name: "history-items-store" }
  )
);

export default useHistoryItemStore;
