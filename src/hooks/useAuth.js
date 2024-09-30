import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../state/Auth/Auth";

const useAuth = () => {
  const Auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem("movewebusertoken") === null ||
      localStorage.getItem("movewebusertoken") === undefined
    ) {
      dispatch(logout());
    } else {
      if (
        localStorage.getItem("movewebuser") === null ||
        localStorage.getItem("movewebuser") === undefined
      ) {
        dispatch(logout());
      } else {
        const user = JSON.parse(localStorage.getItem("movewebuser"));
        dispatch(login({ user: user }));
      }
    }
    setLoading(false);
  }, [dispatch]);
  const setAuth = (user, token) => {
    setLoading(true);
    dispatch(login({ user: user }));
    localStorage.setItem("movewebusertoken", token);
    localStorage.setItem("movewebuser", JSON.stringify(user));
    setLoading(false);
  };

  const removeAuth = () => {
    setLoading(true);
    localStorage.removeItem("movewebusertoken");
    localStorage.removeItem("movewebuser");
    dispatch(logout());
    setLoading(false);
  };

  return { Auth, setAuth, removeAuth, loading };
};

export default useAuth;
