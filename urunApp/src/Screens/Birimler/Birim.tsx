import DynamicScreen from "../../Components/DynamicScreen/DynamicScreen";
import BirimListComponent from "./screens/BirimListComponent";
import DetailComponent from "../Urunler/screens/DetailComponent";
import BirimTransactonComponent from "./screens/BirimTransactionComponent";
import { Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../Store/store";
// import { createColumnHelper } from "@tanstack/react-table";
// import {Table } from "../../Components/Table/Table";
// import { birimGuncelle, birimSil } from "../../Store/KategoriSlice";

const Birim = () => {
  // const birimler = useSelector((state: RootState) => state.urunTipSlice.urunBirimDizi);
  // const columnHelper = createColumnHelper<any>();
  // const dispatch=useDispatch();
  // const columns = [
  //   columnHelper.accessor("id", {
  //     header: "Birim Kodu",
  //     meta: {
  //       readOnly:true,
  //     },
  //   }),
  //   columnHelper.accessor("deger", {
  //     header: "Birim Adı",
  //     // cell: TableCell,
  //     meta: {
  //       type: "text",
  //     },
  //   }),
  // ];
  

  return (
   
    // <Table
    //  edit
    //  selection
    //  delete
    //  data={birimler}
    //  uniqueAccessorKey="id"
    //  columns={columns}
    //  onRowRemove={(data) => {
    //  console.log(data,"data")
    //   dispatch(birimSil(data));
    // }}
    // onRowUpdated={(data) => {
    //   dispatch(birimGuncelle({ ...data }));
    // }}></Table>
    <DynamicScreen
      ListComponent={<BirimListComponent />}
      TransactionComponent={<BirimTransactonComponent />}
      DetailComponent={<DetailComponent />}
    />
  );
};

export default Birim;
