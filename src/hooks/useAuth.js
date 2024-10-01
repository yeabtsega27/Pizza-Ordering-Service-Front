import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../state/Auth/Auth";
import { defineAbilitiesFor } from "../utils/defineAbilitiesFor";

const useAuth = () => {
  const Auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [abilities, setAbilities] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("pizzaorderingtoken") === null ||
      localStorage.getItem("pizzaorderingtoken") === undefined
    ) {
      dispatch(logout());
    } else {
      if (
        localStorage.getItem("pizzaorderinguser") === null ||
        localStorage.getItem("pizzaorderinguser") === undefined
      ) {
        dispatch(logout());
      } else {
        const user = JSON.parse(localStorage.getItem("pizzaorderinguser"));
        const ability = defineAbilitiesFor(user);
        setAbilities(ability);

        dispatch(login({ user: user }));
      }
    }
    setLoading(false);
  }, [dispatch]);
  const setAuth = (user, token) => {
    setLoading(true);
    dispatch(login({ user: user }));
    localStorage.setItem("pizzaorderingtoken", token);
    localStorage.setItem("pizzaorderinguser", JSON.stringify(user));
    setLoading(false);
  };

  const removeAuth = () => {
    setLoading(true);
    localStorage.removeItem("pizzaorderingtoken");
    localStorage.removeItem("pizzaorderinguser");
    dispatch(logout());
    setLoading(false);
  };

  return { Auth, setAuth, removeAuth, loading, abilities };
};

export default useAuth;
