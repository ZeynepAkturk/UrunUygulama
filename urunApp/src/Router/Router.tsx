import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThemeLayout from "../theme-layout/ThemeLayout";
import CategoryIcon from "@mui/icons-material/Category";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import Urunler from "../Screens/Urunler/Urunler";
import Birim from "../Screens/Birimler/Birim";
import Tip from "../Screens/Tipler/Tip";
import Stok from "../Screens/Stok/Stok";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Calisan from "../Screens/Calisanlar/Calisan";

export const routes = [
  {
    index: true,
    element: <Urunler />,
    menuname: "Ürünler",
    path: "/urunler",
    icon: <CategoryIcon></CategoryIcon>,
  },

  {
    element: <Birim></Birim>,
    path: "/urunbirim",
    menuname: "Ürün Birimleri",
    icon: <QrCodeIcon></QrCodeIcon>,
  },
  {
    element: <Tip />,
    path: "/uruntip",
    menuname: "Ürün Tipleri",
    icon: <QrCodeScannerIcon></QrCodeScannerIcon>,
  },
  {
    element: <Stok />,
    path: "/stok",
    menuname: "Ürün Stok",
    icon: <QrCodeScannerIcon></QrCodeScannerIcon>,
  },
  {
    element: <Calisan />,
    path: "/calisanlar",
    menuname: "Çalışanlar",
    icon: <PeopleOutlineIcon />,
  },


];
const router = createBrowserRouter([
  {
    path: "/",
    element: <ThemeLayout />,
    children: routes,
  },
]);

const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;

// {
//   index: true,
//   element: <Anasayfa />,
//   menuname:"Ürünler",
//   icon: <CategoryIcon></CategoryIcon>
// },
// {
//   element: <Urun></Urun>,
//   path:"/urun",
//   menuname:"Ürün",
//   icon: <QrCodeIcon></QrCodeIcon>
// },
// {
//   path: "/urunislemleri",
//   element: <Urun/>,
//   hidden:true
// },
// {
//   path: "/urunGoruntule/:id",
//   element: <UrunDetay></UrunDetay>,
//   hidden:true
// },

// {
//   index:true,
//   element: <Urunler />,
//   menuname:"Ürünler",
//   path:"/urunler",
//   icon: <CategoryIcon></CategoryIcon>
// },

// {
//   path: "/urunTipDuzenle/:id",
//   element: <TipGuncelle></TipGuncelle>,
//   hidden:true
// },
// {
//   path: "/urunTipEkle",
//   element: <TipEkle></TipEkle>,
//   hidden:true
// },

// {
//   path: "/urunBirimDuzenle/:id",
//   element: <BirimGuncelle></BirimGuncelle>,
//   hidden:true
// },
