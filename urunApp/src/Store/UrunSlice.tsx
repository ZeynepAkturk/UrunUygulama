import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { urunler } from "../Entities/Urun";

export interface UrunState {
  urunDizi: typeof urunler;
}

const initialState: UrunState = {
  urunDizi: urunler,
};

export const UrunSlice = createSlice({
  name: "urun",
  initialState,
  reducers: {
    urunEkle: (state, action: PayloadAction<(typeof urunler)[0]>) => {
      state.urunDizi.push(action.payload);
    },
    urunGuncelle: (state, action: PayloadAction<(typeof urunler)[0]>) => {
      // console.log(action.payload.urunKodu);
      const urunDiziIndeks = state.urunDizi.findIndex(
        (p) => p.urunKodu === action.payload.urunKodu
      );
      if (urunDiziIndeks != -1) {
        state.urunDizi[urunDiziIndeks] = action.payload;
      } else state.urunDizi.push(action.payload);
    },

    urunSil: (state, action: PayloadAction<(typeof urunler)[0]>) => {
      state.urunDizi = state.urunDizi.filter(
        (item) => item.urunKodu !== action.payload.urunKodu
      );
    },
  },
});

export const { urunEkle, urunGuncelle, urunSil } = UrunSlice.actions;

export default UrunSlice.reducer;

//  state.urunDizi.find((item:any)=>item.urunKodu.toString()===action.payload.urunKodu)?.urunBirim!=action.payload.urunBirim;
//  state.urunDizi.find((item:any)=>item.urunKodu.toString()===action.payload.urunKodu)?.urunFiyat!=action.payload.urunFiyat;
//  state.urunDizi.find((item:any)=>item.urunKodu.toString()===action.payload.urunKodu)?.urunTanim!=action.payload.urunTanim;
//  state.urunDizi.find((item:any)=>item.urunKodu.toString()===action.payload.urunKodu)?.urunTipi!=action.payload.urunTipi;
//  console.log(action.payload.urunTanim);

// action.payload.urunKodu === p.urunKodu?(p.urunBirim=, p.urunFiyat=action.payload.urunFiyat, p.urunTanim=action.payload.urunTanim, p.urunTipi=action.payload.urunTipi): a=false
// );
