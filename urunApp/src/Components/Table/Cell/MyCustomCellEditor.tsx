
import UrunTableModal from "../Modal/UrunTableModal";
import { useState } from "react";

const MyCustomCellEditor = (props: any) => {
  const [openIslem, setOpenIslem] = useState(false);
  const handleOpenIslem = () => setOpenIslem(true);
  const handleCloseIslem = () => setOpenIslem(false);

  return (
    <div style={{ display: "flex" }}>
      <input readOnly value={props?.getValue()} />
      <button onClick={handleOpenIslem}>+</button>
      {openIslem && (
        <UrunTableModal
          openIslem={openIslem}
          handleClose={handleCloseIslem}
          onSelected={(val) => {
            props.setEditRow(val ? {...val[0], urunMiktar:1} : {});
            handleCloseIslem();
          }}
        ></UrunTableModal>
      )}
      
        
    </div>
  );
};

export default MyCustomCellEditor;
