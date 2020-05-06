import React, { useEffect, useContext } from "react";
import { logout } from "../utils/request";
import { AppContext } from "../Context"

const Logout = () => {
  const { setUser } = useContext(AppContext)
  useEffect(() => {
    const onMount = async () => {
      localStorage.setItem("role", "");
      localStorage.setItem("token", "");
      setUser(false)
      await logout();
    };
    onMount();
  }, []);

  return <div>Logging out</div>;
};

export default Logout;
