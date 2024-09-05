import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Store/store";
import { UrunState, urunSil } from "../../../Store/UrunSlice";
import { useState } from "react";

const DetailComponent = (props: any) => {
  const id = props.activeScreen?.state?.id;
  const changeScreenMode = (activeScreen: any) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const urunDizisi = useSelector((state: RootState) => state.urun.urunDizi);
  const veriBul = urunDizisi.find(
    (item: any) => item.urunKodu.toString() === id
  );

  
  const [urun, setUrun] = useState<UrunState["urunDizi"][0]>({
    urunBirim: veriBul?.urunBirim!,
    urunFiyat: veriBul?.urunFiyat!,
    urunKodu: veriBul?.urunKodu!,
    urunTanim: veriBul?.urunTanim!,
    urunTip: veriBul?.urunTip!,
  });

  const urunlerSil = () => {
    dispatch(urunSil(urun));
    nav("/");
  };
  
  return (
    <>
      <div className="background">
        <div className="urunCard" key={urun?.urunKodu}>
          <div className="urunCardItems">
            Ürün Kodu <hr></hr> {urun?.urunKodu}
          </div>
          <div className="urunCardItems">
            Ürün Tanımı <hr></hr> {urun?.urunTanim}
          </div>
          <div className="urunCardItems">
            Ürün Fiyatı <hr></hr> {urun?.urunFiyat}
          </div>
          <div className="urunCardItems">
            Ürün Birimi<hr></hr> {urun?.urunBirim}
          </div>
          <div className="urunCardItems">
            Ürün Tipi <hr></hr> {urun?.urunTip}
          </div>
          <button
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
            className="urunCardItems"
            onClick={() => {
              changeScreenMode({
                screen: "TRANSACTION",
                state: { id: urun.urunKodu },
              });
            }}
          >
            {" "}
            Güncelle
          </button>
          <button
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
            className="urunCardItems"
            onClick={() => {
              urunlerSil();
              changeScreenMode("TRANSACTION");
            }}
          >
            {" "}
            Sil
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailComponent;
