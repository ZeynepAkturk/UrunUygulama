import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import { Table } from "../Table";
import { useState } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columnHelper = createColumnHelper<any>();

type UrunIslemProps = {
  openIslem: boolean;
  handleClose?: any;
  onSelected?:(val?:any) => void;
};

const UrunTableModal = (props: UrunIslemProps) => {
  const urunler = useSelector((state: RootState) => state.urun.urunDizi);
  const urunKategori = useSelector((state1: RootState) => state1.urunTipSlice);
  const [selectedValue, setSelectedValue] = useState();

  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("urunKodu", {
      header: "Ürün Kodu",
      meta: {
        required: true,
        readOnly: true,
      },
    }),
    columnHelper.accessor("urunTanim", {
      header: "Ürün Tanımı",
    
      meta: {
        type: "text",
      },
    }),
    columnHelper.accessor("urunBirim", {
      header: "Ürün Birimi",

      meta: {
        type: "select",
        options: urunKategori.urunBirimDizi,
      },
    }),
    columnHelper.accessor("urunTip", {
      header: "Ürün Tipi",
      meta: {
        type: "select",
        options: urunKategori.urunTipDizi,
      },
    }),
    columnHelper.accessor("urunFiyat", {
      header: "Ürün Fiyat",
      meta: {
        type: "text",
      },
    }),
  ];

  

  return (
    // <div>
    // {state?.syb=="güncelle"?
    <Modal
      id="modalIslem"
      open={props.openIslem ?? false}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
        <Table
        selection
        singleSelection
        data={urunler}
        uniqueAccessorKey="urunKodu"
        hideNewButton={true}
        columns={columns}
        onRowSelectionChange={setSelectedValue}
        footerActions={[<button onClick={() => (props.onSelected) && props.onSelected(selectedValue)}>Seç</button>]} 
        
    ></Table>
        </div>
      </Box>
    </Modal>
  );
};
export default UrunTableModal;
