import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tipDizi } from "../Entities/UrunTip";
import { urunBirimDizi } from "../Entities/UrunBirim";
export interface KategoriState {
  urunTipDizi: typeof tipDizi;
  urunBirimDizi: typeof urunBirimDizi;
}

const initialState: KategoriState = {
  urunTipDizi: tipDizi,
  urunBirimDizi: urunBirimDizi,
};
export const KategoriSlice = createSlice({
  name: "urunTipSlice",
  initialState,
  reducers: {
    birimEkle: (state, action: PayloadAction<(typeof urunBirimDizi)[0]>) => {
      state.urunBirimDizi.push(action.payload);
    },

    birimGuncelle: (
      state,
      action: PayloadAction<(typeof urunBirimDizi)[0]>
    ) => {
      //  state.urunBirimDizi.map((birim)=>birim.id==action.payload.id?birim.deger=action.payload.deger:birim)
      const urunBirimIndeks = state.urunBirimDizi.findIndex(
        (p) => p.id === action.payload.id
      );
      if (urunBirimIndeks != -1) {
        state.urunBirimDizi[urunBirimIndeks] = action.payload;
      } else state.urunBirimDizi.push(action.payload);
    },

    birimSil: (state, action: PayloadAction<(typeof urunBirimDizi)[0]>) => {
      state.urunBirimDizi = state.urunBirimDizi.filter(
        (item) => item.id !== action.payload.id
      );
    },

    tipekle: (state, action: PayloadAction<(typeof tipDizi)[0]>) => {
      state.urunTipDizi.push(action.payload);
      console.log(state.urunTipDizi);
    },

    tipGuncelle: (state, action: PayloadAction<(typeof tipDizi)[0]>) => {
      const urunTipIndeks = state.urunTipDizi.findIndex(
        (p) => p.id === action.payload.id
      );
      if (urunTipIndeks != -1) {
        state.urunTipDizi[urunTipIndeks] = action.payload;
      } else state.urunTipDizi.push(action.payload);
    },
    // state.urunTipDizi.map((tip)=>tip.id==action.payload.id?tip.deger=action.payload.deger:tip)
    // state.urunTipDizi = state.urunTipDizi.map((x) => {
    //   if(x === action.payload.old){
    //     return action.payload.new
    //   }
    //   return x;
    // })

    tipSil: (state, action: PayloadAction<(typeof tipDizi)[0]>) => {
      state.urunTipDizi = state.urunTipDizi.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  tipekle,
  tipGuncelle,
  tipSil,
  birimEkle,
  birimGuncelle,
  birimSil,
} = KategoriSlice.actions;

export default KategoriSlice.reducer;
