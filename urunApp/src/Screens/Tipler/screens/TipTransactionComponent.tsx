import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../Store/store";
import {
  tipGuncelle,
  tipSil,
  KategoriState,
  tipekle,
} from "../../../Store/KategoriSlice";

const TipTransactonComponent = (props: any) => {
  const id = props.activeScreen?.state?.id;
  const changeScreenMode = (activeScreen: any) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  };

  const nav = useNavigate();
  const dispatch = useDispatch();
 
  const birimBul = useSelector((s: RootState) =>
    s.urunTipSlice.urunTipDizi.find((x) => x.id === id)
  );

  const [tip, islemtip] = useState<KategoriState["urunBirimDizi"][0]>({
    id: birimBul?.id ?? uuidv4(),
    deger: birimBul?.deger ?? "",
  });

  const handleChange = (event: any) => {
    islemtip(
      {
        ...tip,
        deger: event.target.value,
      }
      // deger:event.target.value
    );
    console.log("tip", tip);
  };

  const tipIslem = () => {
    if (!id) {
      dispatch(tipekle({ ...tip }));
      nav("/uruntip");
    } else {
      dispatch(tipGuncelle({ ...tip }));
      nav("/uruntip");
    }
  };
  const tiplerSil = () => {
    const mesaj = confirm("Silmek istediğinize emin misiniz?");
    if (mesaj && id) {
      dispatch(tipSil(tip));
      nav("/uruntip");
    }
  };

  return (
    <div className="background">
      <form className="formContainer">
        <input
          name="deger"
          type="text"
          onChange={handleChange}
          defaultValue={tip.deger}
        ></input>
        <div style={{ border: "none", padding: "5px", margin: "1px" }}>
          <button
            type="button"
            onClick={() => {
              tipIslem(), changeScreenMode("LIST");
            }}
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
          >
            {" "}
            {!id ? "Ekle" : "Güncelle"}
          </button>
          {id ? (
            <button
              onClick={() => {
                tiplerSil(), changeScreenMode("LIST");
              }}
              type="button"
              style={{
                backgroundColor: "yellowgreen",
                color: "white",
                fontSize: "medium",
              }}
            >
              {" "}
              Sil
            </button>
          ) : (
            " "
          )}
        </div>
      </form>
    </div>
  );
};

export default TipTransactonComponent;
