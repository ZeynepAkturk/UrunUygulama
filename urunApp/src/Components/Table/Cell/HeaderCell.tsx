import {useState} from "react";
import ColumnVisibilityModal from "../Modal/ColumnVisibilityModal";
import RecordModal from "../Modal/RecordModal";
type HeaderProps = {
  table: any;
};
export const HeaderCell = (props:HeaderProps) => {
  const meta = props.table.options.meta;
  const [openIslemVisibility, setOpenIslemVisibility] = useState(false);
  const handleOpenIslemVisibility = () => setOpenIslemVisibility(true);
  const handleCloseIslemVisibility = () => setOpenIslemVisibility(false);
  const [openIslem, setOpenIslem] = useState(false);
  const handleOpenIslem = () => setOpenIslem(true);
  const handleCloseIslem = () => setOpenIslem(false);

  return (
    <div className="header-buttons">
       {meta.calisan ? (
          <>
        <button className="add-button" 
        onClick={()=>(handleOpenIslem())}>+</button>
        <RecordModal
          table={props.table}
          openIslem={openIslem}
          handleClose={handleCloseIslem}
        ></RecordModal>
        </>
        
         ): <div/>}
          <button
            className="add-button"
            onClick={handleOpenIslemVisibility}>
            Sütun Gizle →
          </button>
          
      {openIslemVisibility && (
        <ColumnVisibilityModal
          openIslem={openIslemVisibility}
          handleClose={handleCloseIslemVisibility}
          table={props.table}
        ></ColumnVisibilityModal>)}
    </div>
  );
};