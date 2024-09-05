import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
// import { useNavigate } from "react-router-dom";
import PageWrapper from "../../Components/PageWrapper/PageWrapper";
import UrunDetay from "./UrunDetay";
import UrunIslem from "./UrunIslem";
import UrunEkle from "./UrunEkle";

export type UrunDetayTypes = {
  open?: boolean;
  id: null;
  syb?: string;
};

export default function BasicModal() {
  // const nav = useNavigate();
  const urunler = useSelector((state1: RootState) => state1.urun.urunDizi);
  const [query, setQuery] = useState("");

  const [openIslem, setOpenIslem] = React.useState<UrunDetayTypes>({
    open: false,
    id: null,
    syb: "",
  });
  const [openDetay, setOpenDetay] = React.useState<UrunDetayTypes>({
    open: false,
    id: null,
    syb: "",
  });

  const [openEkle, setOpenEkle] = React.useState<UrunDetayTypes>({
    open: false,
    id: null,
    syb: "",
  });
  const handleOpenDetay = (item: any, sb: any) => {
    setOpenDetay({
      open: true,
      id: item.urunKodu,
      syb: sb,
    });
  };

  const handleOpenEkle = (item: any, sb: any) => {
    setOpenEkle({
      open: true,
      id: item.urunKodu,
      syb: sb,
    });
  };

  const handleOpenIslem = (item: any, sb: any) => {
    setOpenIslem({
      open: true,
      id: item.urunKodu,
      syb: sb,
    });
  };

  const handleCloseDetay = () => setOpenDetay({ open: false, id: null });
  const handleCloseIslem = () => setOpenIslem({ open: false, id: null });
  const handleCloseEkle = () => setOpenEkle({ open: false, id: null });
  return (
    <div>
      <PageWrapper onPlusClick={handleOpenEkle}>
        <div>
          <input
            className="urunAramaInput"
            type="search"
            title="urunArama"
            placeholder="Aramak istedğiniz ürünün ürün kodunu giriniz."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          {urunler.map((item) => (
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
                  onClick={() => handleOpenIslem(item, "güncelle")}
                >
                  {" "}
                  Düzenle
                </button>

                <button
                  className="urunCardItems"
                  onClick={() => handleOpenDetay(item, "detay")}
                >
                  Görüntüle
                </button>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>

      {openIslem.open && (
        <UrunIslem
          openIslem={openIslem}
          handleClose={handleCloseIslem}
        ></UrunIslem>
      )}
      <UrunDetay
        openDetay={openDetay}
        handleClose={handleCloseDetay}
      ></UrunDetay>
      <UrunEkle openEkle={openEkle} handleClose={handleCloseEkle}></UrunEkle>
    </div>
  );
}
