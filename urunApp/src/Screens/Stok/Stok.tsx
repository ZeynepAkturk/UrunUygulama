import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../Components/Table/Table";
import MyCustomCellEditor from "../../Components/Table/Cell/MyCustomCellEditor";
import { stokEkle, stokSil } from "../../Store/StokSlice";

const Stok = () => {
  const stok = useSelector((state1: RootState) => state1.stok.stokDizi);
  const kategori = useSelector((state: RootState) => state.urunTipSlice);
  const dispatch = useDispatch();

  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("urunKodu", {
      header: "Ürün Kodu",
      meta: {
        required: true,
        type: "submit",
        readOnly: false,
        CellEditor: MyCustomCellEditor,
      },
    }),

    columnHelper.accessor("urunTanim", {
      header: "Ürün Tanımı",
      meta: {
        type: "text",
        required: true,
      },
    }),
    columnHelper.accessor("urunBirim", {
      header: "Ürün Birimi",

      meta: {
        type: "select",
        options: kategori.urunBirimDizi,
        required: true,
      },
    }),
    columnHelper.accessor("urunTip", {
      header: "Ürün Tipi",
      meta: {
        type: "select",
        options: kategori.urunTipDizi,
        required: true,
      },
    }),
    columnHelper.accessor("urunFiyat", {
      header: "Ürün Fiyatı",
      meta: {
        type: "text",
        required: true,
      },
    }),
    columnHelper.accessor("urunMiktar", {
      header: "Miktar",
      meta: {
        defaultValue: 1,
        type: "number",
        required: true,
      },
    }),

    columnHelper.accessor("seriNo", {
      header: "Stok Seri No",
      meta: {
        type: "number",
        required: true,
      },
    }),
  ];

  return (
    <Table
      edit
      selection
      delete
      data={stok}
      columns={columns}
      onRowRemove={(data) => {
        dispatch(stokSil(data));
      }}
      onRowUpdated={(data) => {
        if (stok.some((x: any) => x.id === data.id)) {
          dispatch(stokEkle({ ...data }));
        } else {
          dispatch(stokSil({ ...data }));
        }
      }}
    ></Table>
    // <DynamicScreen
    //   ListComponent={<TipListComponent  />}
    //   TransactionComponent={<TipTransactonComponent  />}
    //   DetailComponent={<DetailComponent />}
    // />
  );
};

export default Stok;
