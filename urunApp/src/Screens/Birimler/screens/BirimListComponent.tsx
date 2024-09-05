import React, { useState } from "react";
import { ActiveScreenTypes } from "../../../Components/DynamicScreen/DynamicScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import useGlobalFilter from "../../../@hooks/useGlobalFilter";

type BirimListComponentProps = {
  setActiveScreen?: React.Dispatch<React.SetStateAction<ActiveScreenTypes>>;
};

const BirimListComponent = (props: BirimListComponentProps) => {
  const changeScreenMode = (activeScreen: ActiveScreenTypes) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  };

  const urunBirimleri = useSelector(
    (state: RootState) => state.urunTipSlice.urunBirimDizi
  );
  const [query, setQuery] = useState("");
  const filteredResult = useGlobalFilter(urunBirimleri, query);

  return (
    <div>
      <input
        className="urunAramaInput"
        type="search"
        title="urunArama"
        placeholder="Aramak istedğiniz ürün birimini giriniz."
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {filteredResult.map((item) => (
        <div className="urunCard" key={item.id}>
          <div>
            <p style={{ fontWeight: "bold" }}> Ürün Birimi </p>
            <hr></hr>
            {item.deger}
          </div>
          <div className="buttonContainer" style={{ marginLeft: "10px" }}>
            <button
              className="urunCardItems"
              onClick={() => {
                changeScreenMode({
                  screen: "TRANSACTION",
                  state: { id: item.id },
                });
              }}
              // onClick={() => nav(`/tipislemleri`,{state:{id:item.id, deger:"birim"}})}
            >
              {" "}
              Düzenle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BirimListComponent;
