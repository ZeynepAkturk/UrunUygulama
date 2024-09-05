import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import RecordModal from "./RecordModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height:200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};


type UrunIslemProps = {
  table: any;
  openIslem?: boolean;
  handleClose?: any;
  onSelected?: (val?: any) => void;
};


const RecordDetailModal = (props: UrunIslemProps) => {
  const selectedRow=props.table.getSelectedRowModel().rows[0].original;
  const [openIslem, setOpenIslem] = useState(false);
  const handleOpenIslem = () => setOpenIslem(true);
  const handleCloseIslem = () => setOpenIslem(false);
  // console.log("secili öge",selectedRow);
  

  
  return (
   
    <div>

    <Modal
      id="modalIslem"
      open={props.openIslem ?? false}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
     
      <div className="background">
      <div  className="urunCard" key={selectedRow?.id}>
      <button style={{backgroundColor:"yellowgreen", color:"white", fontSize:"medium"}} className='urunCardItems' onClick={() =>(props.handleClose(), props.table.resetRowSelection())}>←</button> 
      <div className='urunCardItems'>
         Id <hr></hr> {selectedRow?.id}
      </div>
      <div  className='urunCardItems'> 
        Ad ve Soyad<hr></hr> {selectedRow?.employee_name}
      </div >
      <div  className='urunCardItems'> 
         Maaş <hr></hr> {selectedRow?.employee_salary}
      </div >
      <div  className='urunCardItems'> 
         Yaş<hr></hr> {selectedRow?.employee_age}
      </div >
      <button style={{backgroundColor:"yellowgreen", color:"white", fontSize:"medium"}} className='urunCardItems' onClick={() => handleOpenIslem()} > Güncelle</button> 
      <RecordModal
      table={props.table}
      openIslem={openIslem}
      handleClose={handleCloseIslem}
      />
      </div>
      </div >
       </Box>
      
     </Modal>
     </div>
     
  );
};
export default RecordDetailModal;
