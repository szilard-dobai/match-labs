import React, { useEffect, useContext } from "react";
import { logout } from "../utils/request";
import { AppContext } from "../Context"

const Logout = () => {
  const { onLogout } = useContext(AppContext)
  useEffect(() => {
    const onMount = async () => {
      localStorage.setItem("role", "");
      localStorage.setItem("token", "");
      onLogout()
      await logout();
    };
    onMount();
  }, []);

  return <div>Logging out</div>;
};

export default Logout;
