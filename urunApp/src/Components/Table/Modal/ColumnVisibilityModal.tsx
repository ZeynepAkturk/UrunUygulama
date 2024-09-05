
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p:5,
};


type UrunIslemProps = {
  table?:any;
  openIslem: boolean;
  handleClose?: any;
  onSelected?:(val?:any) => void;
};

const ColumnVisibilityModal = (props: UrunIslemProps) => {
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
        <div >
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: props.table.getIsAllColumnsVisible(),
                onChange: props.table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Tümünü  Göster
          </label>
        </div>
        {props.table.getAllLeafColumns().map((item:any) => {
        
          return (

            <div key={item.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: item.getIsVisible(),
                    onChange: item.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {item.id}
              </label>
            </div>
          )
        })}
      </div>

  
      </Box>
    </Modal>
  );
};
export default ColumnVisibilityModal;
