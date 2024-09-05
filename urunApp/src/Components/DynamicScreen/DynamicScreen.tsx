import React, { cloneElement } from "react";
import Toolbar from "./components/Toolbar";

export type ScreenTypes = "LIST" | "TRANSACTION" | "DETAIL";

export type ActiveScreenTypes = {
  screen?: ScreenTypes;
  state?: {};
};

export type DynamicScreenProps = {
  ListComponent: React.ReactElement;
  TransactionComponent: React.ReactElement;
  DetailComponent: React.ReactElement;
};

const DynamicScreen = (props: DynamicScreenProps) => {
  const [activeScreen, setActiveScreen] = React.useState<ActiveScreenTypes>({
    screen: "LIST",
    state: {},
  });

  const ekrangetir = (activeScreen: ActiveScreenTypes) => {
    switch (activeScreen.screen) {
      case "LIST":
        return props.ListComponent;
      case "TRANSACTION":
        return props.TransactionComponent;
      case "DETAIL":
        return props.DetailComponent;
      default:
        return props.ListComponent;
    }
  };
  return (
    <>
      <Toolbar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      
      <div className="background">
        {cloneElement(ekrangetir(activeScreen), {
          activeScreen,
          setActiveScreen,
          ...ekrangetir(activeScreen)?.props,
        })}
        {/* {React.cloneElement(screenTypes[activeScreen?.screen ?? "LIST"], {
          
          activeScreen,
          setActiveScreen,
          ...screenTypes[activeScreen.screen ?? "LIST"]?.props,
        })}  */}

        {/* {
        activeScreen.screen=="LIST"? screenTypes.LIST: screenTypes.TRANSACTION
       } */}
      </div>
    </>
  );
};

export default DynamicScreen;
 // const screenTypes: Record<ScreenTypes, React.ReactElement> = {
  //   LIST: props.ListComponent,
  //   TRANSACTION: props.TransactionComponent,
  //   DETAIL: props.DetailComponent,
  // };
 