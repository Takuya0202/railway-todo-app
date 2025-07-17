import { useDispatch } from "react-redux";
import { Router } from "./routes/Router";
import { useEffect } from "react";
import { fetchUser } from "~/store/auth/index";
import React from "react";
import { setIsMobile } from "./store/responsive/index";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };
    handleResize(); // 初期チェック
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
