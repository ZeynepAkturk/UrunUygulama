type Stok = {
  urunKodu: string,
  urunTanim: string,
  urunBirim: string,
  urunTip: string,
  urunFiyat:number,
  urunMiktar:number,
  urunSeriNumara:string,
};


export const stok:Stok[]  = [
  {
    urunKodu: "M001",
    urunTanim: "Malzeme",
    urunBirim: "Adet",
    urunTip:"Servis",
    urunFiyat:1500,
    urunMiktar:1,
    urunSeriNumara:"12345",
  }
  
    
  ];
  const Stok = () => {
    return <div>Stok</div>;
  };
  
  export default Stok;
  