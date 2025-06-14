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
          favouriteItems: state.favouriteItems.filter(
            ele => ele.imdbID !== item.imdbID
          ),
        })),
      clearFavourites: () => set({ favouriteItems: [] }),
    }),
    { name: "favourite-items-store" }
  )
);
export default useFavouriteItemStore;
