import {useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../Store/store";
import { UrunState,urunEkle,urunGuncelle, urunSil,} from "../../../Store/UrunSlice";




const TransactionComponent = (props:any) => {
  
  const id = props.activeScreen?.state?.id;
  const changeScreenMode = (activeScreen: any) => {
  props.setActiveScreen && props.setActiveScreen(activeScreen);
  };
  
  const nav = useNavigate();
  const veriBul = useSelector((s: RootState) =>
    s.urun.urunDizi.find((x) => x.urunKodu === id)
  );
  
  console.log(props.setSelectedItemId);
  const urunKategori = useSelector((state1: RootState) => state1.urunTipSlice);


  const dispatch = useDispatch();
  const [urun, updateUrun] = useState<UrunState["urunDizi"][0]>({
    urunBirim: veriBul?.urunBirim ?? "",
    urunFiyat: veriBul?.urunFiyat ?? 0,
    urunKodu: veriBul?.urunKodu ?? uuidv4(),
    urunTanim: veriBul?.urunTanim ?? "",
    urunTip: veriBul?.urunTip ?? "",
  });
  const handleChange = (event: any) => {
    updateUrun({
      ...urun,
      [event.target.name]: event.target.value,
    });
  };

  const urunIslem = () => {
    if (!id) {
      dispatch(
        urunEkle({ ...urun, urunFiyat: parseFloat(urun.urunFiyat.toString()) })
      );
    } else {
      dispatch(
        urunGuncelle({
          ...urun,
          urunFiyat: parseFloat(urun.urunFiyat.toString()),
        })
      );
    }0
    nav("/urunler");
  };

  const urunlerSil = () => {
    const mesaj = confirm("Ürünü silmek istediğinize emin misiniz?");
    if (mesaj && id) {
      dispatch(urunSil(urun));
      nav("/urunler");
    }
  };
  return (
    <div className="background">
      <form className="formContainer">
        <input
          name="urunKodu"
          onChange={handleChange}
          type="text"
          value={urun.urunKodu}
          readOnly
        ></input>
        <input
          name="urunTanim"
          onChange={handleChange}
          type="text"
          value={urun.urunTanim}
        ></input>
        <input
          name="urunFiyat"
          onChange={handleChange}
          type="text"
          value={urun.urunFiyat}
        ></input>

        <select
          style={{width:"190px"}}
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun.urunTip}
          name="urunTipi"
          id="tip"
        >
          {urunKategori.urunBirimDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>

        <select
          style={{width:"190px"}}
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun.urunBirim}
          name="urunBirim"
          id="birim"
        >
          {urunKategori.urunTipDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>

        <button
          // onClick={()=>{urunIslem(),changeScreenMode("LIST")}}
          onClick={()=>{urunIslem(),changeScreenMode("LIST")}}
          
          type="button"
          style={{
            backgroundColor: "yellowgreen",
            color: "white",
            fontSize: "medium",
          }}
        >
        {!id ? "Ekle" : "Güncelle"} 
        </button>

        {id ? (
          <button
            // onClick={()=>{urunlerSil(),changeScreenMode("LIST")}}
            onClick={()=>{urunlerSil(),changeScreenMode("LIST")}}
            type="button"
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
          >
            Sil
          </button>
        ) : (
          " "
        )}
      </form>
    </div>
  );
};

export default TransactionComponent;
