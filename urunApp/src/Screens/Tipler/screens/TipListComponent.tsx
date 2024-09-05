import React, { useState } from "react";
import { ActiveScreenTypes } from "../../../Components/DynamicScreen/DynamicScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import useGlobalFilter from "../../../@hooks/useGlobalFilter";

// type TipListComponentProps = {
//     setActiveScreen?: React.Dispatch<
//       React.SetStateAction<"LIST" | "TRANSACTION" | "DETAIL">
//     >;
//     setSelectedItemId?:any
//   };
type TipListComponentProps = {
  setActiveScreen?: React.Dispatch<React.SetStateAction<ActiveScreenTypes>>;
  setSelectedItemId?: any;
};

const TipListComponent = (props: TipListComponentProps) => {
  const changeScreenMode = (activeScreen: ActiveScreenTypes) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  };

  const urunTipleri = useSelector(
    (state: RootState) => state.urunTipSlice.urunTipDizi
  );
  const [query, setQuery] = useState("");
  const filteredResult = useGlobalFilter(urunTipleri, query);

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
            <p style={{ fontWeight: "bold" }}> Ürün Tipi </p>
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
              // onClick={()=>{changeScreenMode("TRANSACTION");props.setSelectedItemId(item.id)}}
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

export default TipListComponent;
