import KategoriSlice from "./KategoriSlice";
import StokSlice from "./StokSlice";
import UrunSlice from "./UrunSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    urun: UrunSlice,
    urunTipSlice: KategoriSlice,
    stok: StokSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
