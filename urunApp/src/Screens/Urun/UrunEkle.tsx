
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { UrunState,urunEkle } from "../../Store/UrunSlice";
import { RootState } from "../../Store/store";
import { useState} from "react";
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
  openEkle:UrunDetayTypes,
  handleClose?:any
}


const UrunEkle= (props:UrunIslemProps) => {
 
  // const {state} = useLocation();
  // const urunDizisi = useSelector((state1:RootState)=> state1.urun.urunDizi)
  const urunKategori = useSelector((state2: RootState) => state2.urunTipSlice);
 

  const [urun, setUrun] = useState<UrunState["urunDizi"][0]>({
    urunBirim: "",
    urunFiyat: 0,
    urunKodu:  uuidv4(),
    urunTanim: "",
    urunTip: "",
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
       dispatch( urunEkle({ ...urun }));
  
      
      
 }


  return (
  // <div>
  // {state?.syb=="güncelle"?
  <Modal id="modalIslem"
  open={props.openEkle?.open ?? false}
  onClose={props.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <div key={urun?.urunKodu} className="background">
      <form className="formContainer">
        <input
          name="urunKodu"
          onChange={handleChange}
          type="text"
          value={urun?.urunKodu}
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
        > Ekle
        </button>
         
          </form>
    </div>
    </Box>
 </Modal>
    
  )
}
export default UrunEkle