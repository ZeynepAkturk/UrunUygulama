import { MouseEvent } from "react";

type EditCellProps = {
  row: any;
  table: any;
};
export const EditCell = (props: EditCellProps) => {
  const meta = props.table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); //?
    const elName = e.currentTarget.name;
    
    if (elName === "done") {
      meta.onRowUpdated && meta.onRowUpdated(props.row.original);
     
    }
    if (elName !== "edit") {
      meta?.revertData(props.row.index, e.currentTarget.name === "cancel");
    }

    meta?.setEditedRows((old: any) => ({
      ...old,
      [props.row.id]: !old[props.row.id],
    }));
  };

  return (
    <div className="edit-cell-container">
      {meta?.editedRows[props.row.id] ? (
        ( meta?.hideEditButton? null :
        <div className="edit-cell">
          <button onClick={setEditedRows} name="cancel">
            ⚊
          </button>
          
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) ): (
        <div className="edit-cell-action">
    
         <div> 
          <button onClick={setEditedRows} name="edit">
            ✐
          </button>
        
          {/* <button onClick={removeRow} name="remove">
            X
          </button> */}
          </div>
          
          

        </div>
      )}
    
    </div>
  );
};
