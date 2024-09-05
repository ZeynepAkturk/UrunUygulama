import DynamicScreen from '../../Components/DynamicScreen/DynamicScreen';
import DetailComponent from '../Urunler/screens/DetailComponent';
import TipListComponent from './screens/TipListComponent';
import TipTransactonComponent from './screens/TipTransactionComponent';

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../Store/store";
// import { createColumnHelper } from "@tanstack/react-table";
// import { Table } from "../../Components/Table/Table";
// import { tipGuncelle, tipSil, tipekle } from "../../Store/KategoriSlice";

const Tip = () => {
  // const dispatch = useDispatch();
  // const tipler = useSelector(
  //   (state: RootState) => state.urunTipSlice.urunTipDizi
  // );
  // const columnHelper = createColumnHelper<any>();
  // const columns = [
  //   columnHelper.accessor("id", {
  //     header: "Birim Kodu",

  //     meta: {
  //       readOnly: true,
  //     },
  //   }),
  //   columnHelper.accessor("deger", {
  //     header: "Birim Adı",
     


  //     meta: {
  //       type: "text",
  //     },
  //   }),
    
  // ];

  return (
    // <Table
    //   edit
    //   selection
    //   delete
    //   data={tipler}
    //   uniqueAccessorKey="id"
    //   columns={columns}
    //   onRowRemove={(data) => {
    //     dispatch(tipSil(data));
    //   }}
    //   onRowUpdated={(data) => {
    //     if (tipler.some((x) => x.id === data.id)) {
    //       dispatch(tipGuncelle({ ...data }));
    //     } else {
    //       dispatch(tipekle({ ...data }));
    //     }
    //   }}
    // ></Table>
    <DynamicScreen
      ListComponent={<TipListComponent  />}
      TransactionComponent={<TipTransactonComponent  />}
      DetailComponent={<DetailComponent />}
    />
  );
};

export default Tip;
