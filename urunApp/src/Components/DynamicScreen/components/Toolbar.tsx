import { IconButton } from "@mui/material";
import { ActiveScreenTypes, ScreenTypes } from "../DynamicScreen";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import React from "react";

export type ToolbarProps = {
  activeScreen: ActiveScreenTypes;
  setActiveScreen: React.Dispatch<React.SetStateAction<ActiveScreenTypes>>;
};

const Toolbar = (props: ToolbarProps) => {
  const screenTypes: Record<ScreenTypes, React.ReactElement> = {
    LIST: (
     < > 
     <IconButton
        onClick={() =>
          props.setActiveScreen({ screen: "TRANSACTION", state: {} })
        }
      >
        +
      </IconButton>
      
      </>
    ),
  
    TRANSACTION: (
      <div className="main">
        <IconButton
          onClick={() => props.setActiveScreen({ screen: "LIST", state: {} })}
        >
          {" "}
          <ChevronLeft></ChevronLeft> <p style={{ fontSize: "small" }}> Geri</p>
        </IconButton>
      </div>
    ),
    DETAIL: (
      <div>
        {" "}
        <IconButton
          onClick={() => props.setActiveScreen({ screen: "LIST", state: {} })}
        >
          {" "}
          <ChevronLeft></ChevronLeft>{" "}
        </IconButton>{" "}
        <IconButton
          onClick={() =>
            props.setActiveScreen({ screen: "TRANSACTION", state: {} })
          }
        >
          +
        </IconButton>{" "}
      </div>
    ),
  };
  return (
    <div className="main">
      {screenTypes[props.activeScreen.screen ?? "LIST"]}
    </div>
  );
};

export default Toolbar;
{
  /* <IconButton
        onClick={() => props.setActiveScreen({ screen: "LIST", state: {} })}
      >
        <ChevronLeft></ChevronLeft>
      </IconButton>
      <IconButton
        onClick={() =>
          props.setActiveScreen({ screen: "TRANSACTION", state: {} })
        }
      >
        +
      </IconButton> */
}

//  const screenTypes: Record<ScreenTypes, React.ReactElement> = {
//    LIST: <IconButton>+</IconButton> ,
//    TRANSACTION: <div className="main"> <IconButton > <ChevronLeft></ChevronLeft> </IconButton> <IconButton >+</IconButton> </div>,
//    DETAIL: <div className="main"> <IconButton>      <ChevronLeft></ChevronLeft> </IconButton> <IconButton >+</IconButton> </div>,
//    };
