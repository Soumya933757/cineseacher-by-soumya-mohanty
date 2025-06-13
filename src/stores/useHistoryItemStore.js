import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryItemStore = create(
  persist(
    set => ({
      historyItems: [],
      addHistoryItem: item =>
        set(state => ({ historyItems: [item, ...state.historyItems] })),
      removeHistoryItem: id =>
        set(state => ({
          historyItems: state.historyItems.filter(item => item.id !== id),
        })),
      clearHistory: () => set({ historyItems: [] }),
    }),
    { name: "history-items-store" }
  )
);

export default useHistoryItemStore;
