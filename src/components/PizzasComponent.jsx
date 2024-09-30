import { Avatar, Box, Button, Grid, Link, Typography } from "@mui/material";

import ShowBirr from "./ShowBirr";
import PropTypes from "prop-types";
import { IMAGEBASEURL } from "../config/config";

export default function PizzasComponent({ pizza }) {
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
          maxWidth: "430px",
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
            src={`${IMAGEBASEURL}${pizza?.image}`}
            sx={{
              width: "272px",
              height: "272px",
            }}
          ></Avatar>
        </Box>
        <Typography fontSize={"25px"} fontWeight={800}>
          {pizza?.name}
        </Typography>
        <Typography fontSize={"15px"} fontWeight={400}>
          {pizza?.Toppings.map((topping) => topping.name).join(",")}
          Tomato, Mozzarella, Bell Peppers, Onions, Olives
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {/* Price Section */}

          <ShowBirr price={pizza?.price} />

          {/* Order Button */}
          <Link href={`/order/${pizza.id}`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF8100",
                padding: "10px 20px",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#FF9921",
                },
              }}
            >
              Order
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,

            padding: 2,
          }}
        >
          <Avatar
            src={`${IMAGEBASEURL}${pizza?.Restaurant.logo}`}
            sx={{ width: 56, height: 56 }}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {pizza?.Restaurant.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
PizzasComponent.propTypes = {
  pizza: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
