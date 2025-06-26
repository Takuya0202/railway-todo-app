import { ChevronIcon } from "~/icons/ChevronIcon";
import "./BackButton.css";
import React from "react";

const handleClick = () => {
  window.history.back();
};

export const BackButton = () => {
  return (
    <button type="button" onClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </button>
  );
};
