import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AxioxFatch from "../../lib/axioxFatch";
import { useNavigate, useSearchParams } from "react-router-dom";
import PizzasComponent from "../../components/PizzasComponent";

export default function SearchPage() {
  const { instance } = AxioxFatch();
  const [orders, setOrders] = useState([]);
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("search"));

  const { Auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const FeachMyOrders = async () => {
      try {
        const res = await instance.get("pizza", {
          params: { search: searchParams.get("search") ?? "" },
        });
        setOrders(res.data.pizza);
      } catch (e) {
        console.error(e);
      }
    };

    if (Auth.isAuthenticated) {
      FeachMyOrders();
    } else {
      // navigate("/login");
    }
  }, [Auth.isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        px: "7vw",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        gap: 5,

        background: "#FFF8F1", // Define the vertical gradient
        pb: 8,
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          color: "#00000080",
          fontWeight: 600,
        }}
      >
        Serch
      </Typography>
      {}
      <Grid container spacing={5}>
        {orders.map((order) => {
          return <PizzasComponent key={order.id} pizza={order} />;
        })}
      </Grid>
    </Box>
  );
}
