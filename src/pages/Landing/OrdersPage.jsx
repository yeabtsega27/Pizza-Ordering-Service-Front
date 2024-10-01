import { Box, Grid, Typography } from "@mui/material";
import OrdersComponent from "../../components/OrdersComponent";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { instance } from "../../lib/axioxFatch";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const { Auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const FeachMyOrders = async () => {
      try {
        const res = await instance.get("orders/myorder");
        setOrders(res.data.orders);
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
        Order History
      </Typography>
      {}
      <Grid container spacing={5}>
        {orders.map((order) => {
          return <OrdersComponent key={order.id} order={order} />;
        })}
      </Grid>
    </Box>
  );
}
