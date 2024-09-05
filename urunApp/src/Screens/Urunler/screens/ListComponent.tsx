import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../Store/store";
import useGlobalFilter from "../../../@hooks/useGlobalFilter";
import { ActiveScreenTypes } from "../../../Components/DynamicScreen/DynamicScreen";

type ListComponentProps = {
  setActiveScreen?: React.Dispatch<
    React.SetStateAction<ActiveScreenTypes>
  >;
  setSelectedItemId?: any;
};


const ListComponent = (props: ListComponentProps) => {

  // const changeScreenMode = (
  //   activeScreen: DynamicScreenProps["activeScreen"]
  // ) => {
  //   props.setActiveScreen && props.setActiveScreen(activeScreen ?? "LIST");
  // };

  const changeScreenMode = (activeScreen:ActiveScreenTypes) => {
    props.setActiveScreen && props.setActiveScreen(activeScreen);
  };
  const [query, setQuery] = useState("");
 

  const urunler = useSelector((state: RootState) => state.urun.urunDizi);
  const filteredResult = useGlobalFilter(urunler, query);

  return (
    <div >
      <input
        className="urunAramaInput"
        type="search"
        title="urunArama"
        placeholder="Aramak istedğiniz ürünün ürün kodunu giriniz."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {filteredResult.map((item) => (
        <div className="urunCard" key={item.urunKodu}>
          <div className="urunCardItems">
            <p style={{ fontWeight: "bold" }}> Ürün Kodu </p>
            <hr></hr>
            {item.urunKodu}
          </div>
          <div className="urunCardItems">
            <p style={{ fontWeight: "bold" }}>Ürün Tanımı</p>
            <hr></hr> {item.urunTanim}
          </div>
          <div className="buttonContainer">
            <button
              className="urunCardItems"
              // onClick={() => {changeScreenMode("TRANSACTION");props.setSelectedItemId(item.urunKodu)}}
              onClick={() => {
                changeScreenMode({
                  screen: "TRANSACTION",
                  state: { id: item.urunKodu },
                });
              }}
            >
              {" "}
              Düzenle
            </button>
            <button
              className="urunCardItems"
              // onClick={() => nav(`/urunGoruntule/${item.urunKodu}`)}
              onClick={() => {
                changeScreenMode({
                  screen: "DETAIL",
                  state: { id: item.urunKodu},
                });
              }}
            >
              Görüntüle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
