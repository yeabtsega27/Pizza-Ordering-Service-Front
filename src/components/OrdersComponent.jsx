import { Avatar, Box, Grid, Typography } from "@mui/material";

import ShowBirr from "./ShowBirr";
import PropTypes from "prop-types";
import { IMAGEBASEURL } from "../config/config";

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { color: "red" };
    case "Preparing":
      return { color: "#FFA500" };
    case "Ready":
      return { color: "#008000" };
    case "Delivered":
      return { color: "#008000" };
    default:
      return {};
  }
};
export default function OrdersComponent({ order }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          height: "621px",
          bgcolor: "#FFFFFF",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            width: "300px",
            height: "300px",
            bgcolor: "#EA810033",
            m: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1000,
          }}
        >
          <Avatar
            src={`${IMAGEBASEURL}${order?.Pizza?.image}`}
            sx={{
              width: "272px",
              height: "272px",
            }}
          ></Avatar>
        </Box>
        <Typography fontSize={"25px"} fontWeight={800}>
          {order?.Pizza?.name}
        </Typography>
        <Typography fontSize={"15px"} fontWeight={400}>
          {order.Toppings.map((topping) => topping.name).join(",")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          {/* Price Section */}

          <ShowBirr price={order?.amount * order?.Pizza?.price} />

          {/* Order Button */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#FFA500",
              fontSize: "30px",
              ...getStatusStyle(order.status),
            }}
          >
            {order.status}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
OrdersComponent.propTypes = {
  order: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
