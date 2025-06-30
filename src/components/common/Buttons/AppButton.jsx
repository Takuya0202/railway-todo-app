import React from "react";
import "./AppButton.css";

const AppButton = ({ children, ...props }) => {
  return (
    <button className="app_button" {...props}>
      {children}
    </button>
  );
};

export default AppButton;
