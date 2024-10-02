import { useEffect, useState } from "react";
import AxioxFatch from "../lib/axioxFatch";
import UseToast from "./UseToast";
import useAuth from "./useAuth";

const useAxios = ({ basurl, params }) => {
  const { instance } = AxioxFatch();

  const { Auth } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error } = UseToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await instance.get(basurl, {
          params: params,
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("pizzaorderingtoken"),
          },
        });
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        error(err.response.data.msg)();
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basurl, Auth]);

  return { data, loading, setData };
};

export default useAxios;
