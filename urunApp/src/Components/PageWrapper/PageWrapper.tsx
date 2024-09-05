import React from "react";
import Toolbar, { ToolbarProps } from "../../Z/Toolbar";

type PageWrapperProps = ToolbarProps & {
  children?: React.ReactNode;
};

const PageWrapper = (props: PageWrapperProps) => {
  return (
    <>
      <Toolbar onPlusClick={props.onPlusClick} />
      <div className="background">{props.children}</div>
    </>
  );
};

export default PageWrapper;
