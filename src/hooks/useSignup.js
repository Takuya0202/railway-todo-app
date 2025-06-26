import { useDispatch } from "react-redux";
import { useCallback } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signup } from "~/store/auth";

export const useSignup = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSignup = useCallback(
    async ({ email, password, name }) => {
      await dispatch(
        signup({
          email,
          password,
          name,
        }),
      ).unwrap();
      nav("/");
    },
    [useDispatch],
  );

  return {
    signup: handleSignup,
  };
};
