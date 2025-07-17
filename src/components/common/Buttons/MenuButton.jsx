import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { useLogout } from "~/hooks/useLogout";
import { fetchLists } from "~/store/list/index";
import { PlusIcon } from "~/icons/PlusIcon";
import { ListIcon } from "~/icons/ListIcon";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import "./MenuButton.css";

const MenuButton = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const lists = useSelector((state) => state.list.lists);
  const activeId = useSelector((state) => state.list.current);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const userName = useSelector((state) => state.auth.user?.name);

  // リスト新規作成ページではリストをハイライトしない
  const shouldHighlight = !pathname.startsWith("/list/new");

  const { logout } = useLogout();
  useEffect(() => {
    void dispatch(fetchLists());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton 
      onClick={handleMenuToggle}
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        zIndex: isOpen ? -1000 : 1000,
        backgroundColor: "black",
        color: "white",
      }}
      >
        <MenuIcon />
      </IconButton>
      {isOpen && (
        <div className="sidebar">
            <div className="sidebar__header">
              <Link to="/">
                <h1 className="sidebar__title">Todos</h1>
              </Link>
              <IconButton onClick={handleMenuToggle}>
                <CloseIcon />
              </IconButton>
            </div>
         {isLoggedIn ? (
            <>
              {lists && (
                <div className="sidebar__lists">
                  <h2 className="sidebar__lists_title">Lists</h2>
                  <ul className="sidebar__lists_items">
                    {lists.map((listItem) => (
                      <li key={listItem.id}>
                        <Link
                          data-active={
                            shouldHighlight && listItem.id === activeId
                          }
                          to={`/lists/${listItem.id}`}
                          className="sidebar__lists_item"
                          onClick={handleMenuToggle}
                        >
                          <ListIcon
                            aria-hidden
                            className="sidebar__lists_icon"
                          />
                          {listItem.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/list/new" className="sidebar__lists_button" onClick={handleMenuToggle}>
                        <PlusIcon className="sidebar__lists_plus_icon" />
                        New List...
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div className="sidebar__spacer__sp" aria-hidden />
              <div className="sidebar__account">
                <p className="sidebar__account_name">{userName}</p>
                <Button
                  type="button"
                  className="sidebar__account_logout"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="sidebar__login">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MenuButton;
