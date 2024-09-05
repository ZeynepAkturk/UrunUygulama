import { useDispatch, useSelector } from "react-redux";
import { UrunState,urunGuncelle, urunSil } from "../../Store/UrunSlice";
import { RootState } from "../../Store/store";
import {useState} from "react";
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

type UrunIslemProps = {
  openIslem:UrunDetayTypes,
  handleClose?:any
}


const UrunIslem = (props:UrunIslemProps) => {
 
  // const {state} = useLocation();
  const urunDizisi = useSelector((state1:RootState)=> state1.urun.urunDizi)
  const urunKategori = useSelector((state2: RootState) => state2.urunTipSlice);
  const veriBul= urunDizisi.find((item:any)=>item.urunKodu.toString()===props.openIslem.id)

  const [urun, setUrun] = useState<UrunState["urunDizi"][0]>({
    urunBirim:veriBul?.urunBirim ?? "",
    urunFiyat:veriBul?.urunFiyat?? 0,
    urunKodu:veriBul?.urunKodu?? "",
    urunTanim:veriBul?.urunTanim?? "",
    urunTip:veriBul?.urunTip?? "",
  });
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   setUrun({
  //     urunBirim:veriBul?.urunBirim ?? "",
  //     urunFiyat:veriBul?.urunFiyat?? 0,
  //     urunKodu:veriBul?.urunKodu?? "",
  //     urunTanim:veriBul?.urunTanim?? "",
  //     urunTipi:veriBul?.urunTipi?? "",
  //   })
  // },[veriBul?.urunKodu])

  const handleChange = (event: any) => {
    setUrun(
       {
        ...urun,
        [event.target.name]: event.target.value,
       }
       
     )
     
   }

 const urunIslem = () => {
       dispatch( urunGuncelle({ ...urun }));
  
      
      
 }

  const urunlerSil = () => {
    dispatch(urunSil(urun));
 
   
  };
  return (
  // <div>
  // {state?.syb=="güncelle"?
  <Modal id="modalIslem"
  open={props.openIslem?.open ?? false}
  onClose={props.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <div key={veriBul?.urunKodu} className="background">
      <form className="formContainer">
        <input
          name="urunKodu"
          onChange={handleChange}
          type="text"
          value={veriBul?.urunKodu}
          readOnly
        ></input>
        <input
          name="urunTanim"
          onChange={handleChange}
          type="text"
          value={urun?.urunTanim}
        ></input>
        <input
          name="urunFiyat"
          onChange={handleChange}
          type="text"
          value={urun?.urunFiyat}
        ></input>

        <select
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun?.urunTip}
          name="urunTipi"
          id="tip"
        >
          {urunKategori.urunTipDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>

        <select
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun?.urunBirim}
          name="urunBirim"
          id="birim"
        >
          {urunKategori.urunBirimDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>
      
       
         <button
          // onClick={()=>{urunIslem(),changeScreenMode("LIST")}}
          onClick={()=>{
            urunIslem(), props.handleClose()}}
          
          type="button"
          style={{
            backgroundColor: "yellowgreen",
            color: "white",
            fontSize: "medium",
          }}
        > Güncelle
        </button>
          <button
            // onClick={()=>{urunlerSil(),changeScreenMode("LIST")}}
            onClick={()=>{urunlerSil(), props.handleClose()}}
            type="button"
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
          >
            Sil
          </button>
          </form>
    </div>
    </Box>
 </Modal>
    
  )
}
export default UrunIslem



//           : 
//           <div className="background"  key={urun?.urunKodu}>
//            <div  className="urunCard">
//           <div className='urunCardItems'>
//          Ürün Kodu <hr></hr> {urun?.urunKodu}
//       </div>
//       <div  className='urunCardItems'> 
//         Ürün Tanımı <hr></hr> {urun?.urunTanim}
//       </div >
//       <div  className='urunCardItems'> 
//          Ürün Fiyatı <hr></hr> {urun?.urunFiyat}
//       </div >
//       <div  className='urunCardItems'> 
//          Ürün Birimi<hr></hr> {urun?.urunBirim}
//       </div >
//       <div  className='urunCardItems'> 
//         Ürün Tipi <hr></hr> {urun?.urunTipi}
//       </div >
//        </div>
//       </div>
  
// }
//     </div>
 
    {/* <div className="background">
    <div  className="urunCard" key={urun?.urunKodu}>
    <div className='urunCardItems'>
       Ürün Kodu <hr></hr> {urun?.urunKodu} 
    </div>
    <div  className='urunCardItems'> 
      Ürün Tanımı <hr></hr> {urun?.urunTanim}
    </div >
    <div  className='urunCardItems'> 
       Ürün Fiyatı <hr></hr> {urun?.urunFiyat}
    </div >
    <div  className='urunCardItems'> 
       Ürün Birimi<hr></hr> {urun?.urunBirim}
    </div >
    <div  className='urunCardItems'> 
      Ürün Tipi <hr></hr> {urun?.urunTipi}
    </div > */}
    {/* <button style={{backgroundColor:"yellowgreen", color:"white", fontSize:"medium"}} className='urunCardItems'onClick={()=>nav(`/urun`,{state:urun.urunKodu})}> Güncelle</button> 
    <button style={{backgroundColor:"yellowgreen", color:"white", fontSize:"medium"}} className='urunCardItems'onClick={urunlerSil}> Sil</button>  */}
     {/* </div>
  
  </div>*/}
   
     {/* <Modal id="modalDetay"
        open={openIslem}
        onClose={handleCloseIslem}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <UrunIslem></UrunIslem>
        </Box>
      </Modal> */}




 {/* <Modal id="modalIslem"
  open={openIslem}
  onClose={handleCloseIslem}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"

> 
 <Box sx={style}>
  <div key={urun.urunKodu} className="background">
      <form className="formContainer">
        <input
          name="urunKodu"
          onChange={handleChange}
          type="text"
          value={urun.urunKodu}
          readOnly
        ></input>
        <input
          name="urunTanim"
          onChange={handleChange}
          type="text"
          value={urun.urunTanim}
        ></input>
        <input
          name="urunFiyat"
          onChange={handleChange}
          type="text"
          value={urun.urunFiyat}
        ></input>

        <select
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun.urunTipi}
          name="urunTipi"
          id="tip"
        >
          {urunKategori.urunBirimDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>

        <select
          key={urun.urunKodu}
          onChange={handleChange}
          value={urun.urunBirim}
          name="urunBirim"
          id="birim"
        >
          {urunKategori.urunTipDizi.map((item) => (
            <option> {item.deger}</option>
          ))}
        </select>
      
       
         <button
          onClick={()=>{urunIslem(), handleCloseIslem()}}
          
          type="button"
          style={{
            backgroundColor: "yellowgreen",
            color: "white",
            fontSize: "medium",
          }}
        > Güncelle
        </button>
          <button
            onClick={()=>{urunlerSil(), handleCloseIslem()}}
            type="button"
            style={{
              backgroundColor: "yellowgreen",
              color: "white",
              fontSize: "medium",
            }}
          >
            Sil
          </button>
          </form>
    </div>
    </Box> 
 </Modal>
*/}