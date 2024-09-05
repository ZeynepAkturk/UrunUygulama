import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { UrunDetayTypes } from "./Urun";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type UrunDetayProps = {
  openDetay?:UrunDetayTypes,
  handleClose?:any
}

const UrunDetay = (props:UrunDetayProps) => {

    const urunDizisi = useSelector((state1:RootState)=> state1.urun.urunDizi)
    const veriBul= urunDizisi.find((item:any)=>item.urunKodu.toString()===props.openDetay?.id)
   
 
    
  return (
    <div>
      <Modal id="modalDetay"
      
        open={props.openDetay?.open ?? false}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
           <Box sx={style}>
         <div className="background"  key={veriBul?.urunKodu}>
           <div  className="urunCard">
          <div className='urunCardItems'>
         Ürün Kodu <hr></hr> {veriBul?.urunKodu}
         </div>
         <div  className='urunCardItems'> 
        Ürün Tanımı <hr></hr> {veriBul?.urunTanim}
         </div >
         <div  className='urunCardItems'> 
         Ürün Fiyatı <hr></hr> {veriBul?.urunFiyat}
         </div >
         <div  className='urunCardItems'> 
          Ürün Birimi<hr></hr> {veriBul?.urunBirim}
        </div >
        <div  className='urunCardItems'> 
        Ürün Tipi <hr></hr> {veriBul?.urunTip}
        </div >
       </div>
      </div>
    </Box>
      </Modal>
      </div>
  )
}

export default UrunDetay