import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stok } from "../Entities/Stok";
export interface StokState {
  stokDizi: typeof stok;
}

const initialState: StokState = {
  stokDizi: stok,
};

export const StokSlice = createSlice({
  name: "stok",
  initialState,
  reducers: {
    stokEkle: (state, action: PayloadAction<(typeof stok)[0]>) => {
      const urunDiziIndeks = state.stokDizi.findIndex(
        (p) => p.urunKodu === action.payload.urunKodu
      );
      if (urunDiziIndeks != -1) {
        state.stokDizi[urunDiziIndeks] = action.payload;
      } else state.stokDizi.push(action.payload);
    },
    stokSil: (state, action: PayloadAction<(typeof stok)[0]>) => {
      state.stokDizi = state.stokDizi.filter(
        (item) => item.urunKodu !== action.payload.urunKodu
      );
    },
  },
});

export const { stokEkle, stokSil } = StokSlice.actions;

export default StokSlice.reducer;
