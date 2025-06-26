import { useDispatch } from "react-redux";
import { useCallback } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "~/store/auth";

export const useLogout = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = useCallback(async () => {
    await dispatch(logout()).unwrap();
    nav("/signin");
  }, [useDispatch]);

  return {
    logout: handleLogout,
  };
};
