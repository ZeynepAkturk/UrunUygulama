import React, { useState } from "react";
import RecordDetailModal from "../Modal/RecordDetailModal";
// import axios from "axios";
// import { useMutation } from "react-query";
// import { calisanQueryClient } from "../../../App";
// import { keepPreviousData } from "@tanstack/react-query";

type FooterProps = {
  table: any;
  handleClose?: any;
  openIslem?: any;
  handleOpenIslem?: any;
  row?: any;
};


// const deleteUser = async (userId: any) => {
//   const response = await axios.delete(`/api/v1/delete/${userId}`);
//   return response.data;
  
// };

// const deleteUser = async (userId:any) => {
//   const response = await axios.delete(`/api/v1/delete/${userId}`);
//   return response.data;
// };


export const FooterCell = (props: FooterProps) => {
  var degerler: any[] = [];
  const meta = props.table.options.meta;
  const selectedRows = props.table.getSelectedRowModel().rows;
  selectedRows.map((item: any) => {
    degerler.push(item.original.id);
  });

  const [openIslem, setOpenIslem] = useState(false);
  const handleOpenIslem = () => setOpenIslem(true);
  const handleCloseIslem = () => setOpenIslem(false);

  const removeRows = () => {
    meta.removeSelectedRows(
      props.table.getSelectedRowModel().rows.map((row: any) => row.index)
    );
    props.table.resetRowSelection();
    props.table
      .getSelectedRowModel()
      .rows.map((row: any) => meta.onRowRemove(row.original)); //seçilen verileri listeden sil
  };

  // const deleteUserMutation = useMutation(deleteUser, {
  //   onSuccess: (data,userId) => {
  //     calisanQueryClient.setQueryData("users", (prevData: any) =>
  //      prevData.filter((user: any) => user.id!== userId.data)    
  //     );
      
  //   },
  // });
  // const handleDeleteUser = (userId: any) => {
  //   userId.map((item: any) => deleteUserMutation.mutate(item));
  //   // props.table.resetRowSelection();
  // };
 


  return (
    <div className="footer-buttons">
      <div>
        {meta?.hideNewButton ? (
          selectedRows.length == 1 ? (
            <>
              <button className="add-button" onClick={() => handleOpenIslem()}>
                Detaya Git
              </button>
              <RecordDetailModal
                table={props.table}
                openIslem={openIslem}
                handleClose={handleCloseIslem}
              ></RecordDetailModal>
            </>
          ) : null
        ) : (
          <button className="add-button" onClick={meta.addRow}>
            Yeni Ekle +
          </button>
        )}
        {meta?.footerActions &&
          React.Children.toArray(meta?.footerActions.map((item: any) => item))}
      </div>
      <div>
        {meta?.selection && selectedRows.length && meta?.delete > 0 ? (
          <button
            className="remove-button"
            onClick={
              // meta?.calisan ? () =>
              //  handleDeleteUser(degerler) 
              //  handleDeleteUser(degerler):
               removeRows
            }
          >
            Seçili ögeleri sil x
          </button>
        ) : null}
      </div>
    </div>
  );
};
