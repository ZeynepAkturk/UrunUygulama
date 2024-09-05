// import DynamicScreen from "../../Components/DynamicScreen/DynamicScreen";
// import DetailComponent from "./screens/DetailComponent";
// import ListComponent from "./screens/ListComponent";
// import TransactionComponent from "./screens/TransactionComponent";
// import { urunGuncelle } from "../../Store/UrunSlice";
// import BasicTable from "../../Components/BasicTable";
// import GroupingTable from "../../Components/Tablo/GroupingTable";

import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../Components/Table/Table";
import { RootState } from "../../Store/store";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { urunGuncelle, urunSil } from "../../Store/UrunSlice";


const Urunler = () => {
  const urunler = useSelector((state: RootState) => state.urun.urunDizi);
  const columnHelper = createColumnHelper<any>(); 
  const urunKategori = useSelector((state1: RootState) => state1.urunTipSlice);
  const dispatch = useDispatch();

  const columns:ColumnDef<any>[] = [
   
    columnHelper.accessor("urunKodu", {
      header: "Ürün Kodu",
      getGroupingValue: row => `${row.urunKodu}`,
      
      meta: {
        required: true,
        readOnly: true,
        // cellEdit:(info:any)=>info.getValue()
        
      },
    }),
    columnHelper.accessor("urunTanim", {
      header: "Ürün Tanımı",
      getGroupingValue: row => `${row.urunTanim}`,
      // cell: TableCell,
     
      meta: {
        type: "text",
        required: true,
      },
    }),
    columnHelper.accessor("urunBirim", {
      header: "Ürün Birimi",
      
      // cell: info=> info.getValue(), //grp
      getGroupingValue: row => `${row.urunBirim}`,
      meta: {
        
        type: "select",
        options: urunKategori.urunBirimDizi,
        required: true,
      },
    }),
    columnHelper.accessor("urunTip", {
      header: "Ürün Tipi",
      getGroupingValue: row => `${row.urunTip}`,
      meta: {
        type: "select",
        options: urunKategori.urunTipDizi,
        required: true,
        
      },
    }),
    columnHelper.accessor("urunFiyat", {
      header: "Ürün Fiyatı",
      getGroupingValue: row => `${row.urunFiyat}`,
      meta: {
        
        required: true,
      },
      

    }),
  
  ];

  return (
 
    // <BasicTable/>
    <Table
      edit
      selection={true}
      delete={true}
      data={urunler}
      uniqueAccessorKey="urunKodu"
      columns={columns}
      theRowStyle={(row:any) => {
        return {backgroundColor:(row.original.urunFiyat<1600? "#FA8072" :undefined)}
      }}
      onRowRemove={(data) => {
        dispatch(urunSil(data));
      }}
      onRowUpdated={(data) => {
        dispatch(urunGuncelle({ ...data }));
      }}
      
    ></Table>

    // <DynamicScreen
    //   ListComponent={<ListComponent  />}
    //   TransactionComponent={<TransactionComponent />}
    //   DetailComponent={<DetailComponent />}
    // />

    
  );
};




export default Urunler;

