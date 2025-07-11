import React, { useCallback } from "react";
import Button from "~/components/common/Buttons/Button";
import { ChevronIcon } from "~/icons/ChevronIcon";
import "./BackButton.css";
const BackButtonModal = ({ setIsOpen, children, ...props }) => {
  // モーダルを閉じる
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // cssはBackButtonを使用
  return (
    <Button
      type="button"
      onClick={handleClose}
      className="back_button"
      {...props}
    >
      <ChevronIcon className="back_button__icon" />
      {children}
    </Button>
  );
};

export default BackButtonModal;
