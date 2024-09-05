import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../Store/store";
import {
  birimEkle,
  birimGuncelle,
  birimSil,
  KategoriState,
} from "../../../Store/KategoriSlice";

const BirimTransactonComponent = (props: any) => {
  const id = props.activeScreen?.state?.id;
  const changeScreenMode = (activeScreen: any) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  }
  const nav = useNavigate();
  const dispatch = useDispatch();
  const birimBul = useSelector((s: RootState) =>
    s.urunTipSlice.urunBirimDizi.find(
      (x) => x.id === props.activeScreen?.state?.id
    )
  );
  const [birim, islembirim] = useState<KategoriState["urunBirimDizi"][0]>({
    id: birimBul?.id ?? uuidv4(),
    deger: birimBul?.deger ?? "",
  });

  const handleChange = (event: any) => {
    islembirim({
      ...birim,
      deger: event.target.value,
    });
  };

  const birimIslem = () => {
    if (!id) {
      dispatch(birimEkle({ ...birim }));
      nav("/urunbirim");
    } else {
      dispatch(birimGuncelle({ ...birim }));
      nav("/urunbirim");
    }
  };
  const birimlerSil = () => {
    const mesaj = confirm("Silmek istediğinize emin misiniz?");
    if (mesaj && id) {
      dispatch(birimSil(birim));
      nav("/urunbirim");
    }
  };

  return (
    <div className="background">
      <form className="formContainer">
        <input
          name="deger"
          type="text"
          onChange={handleChange}
          defaultValue={birim.deger}
        ></input>
        <div style={{ border: "none", padding: "5px", margin: "1px" }}>
          <button
            type="button"
            onClick={() => {
              birimIslem(), changeScreenMode({ screen: "LIST" });
            }}
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
          >
            {" "}
            {!id? "Ekle" : "Güncelle"}
          </button>
          { id ? (
            <button
              onClick={() => {
                birimlerSil(), changeScreenMode({ screen: "LIST" });
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

export default BirimTransactonComponent;
