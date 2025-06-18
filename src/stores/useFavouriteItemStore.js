import { removeBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouriteItemStore = create(
  persist(
    set => ({
      favouriteItems: [],
      addFavouriteItem: item =>
        set(state => ({ favouriteItems: [item, ...state.favouriteItems] })),
      removeFavouriteItem: item =>
        set(state => ({
          favouriteItems: removeBy(
            { imdbID: item.imdbID },
            state.favouriteItems
          ),
        })),
      clearFavourites: () => set({ favouriteItems: [] }),
    }),
    { name: "favourite-items-store" }
  )
);
export default useFavouriteItemStore;
