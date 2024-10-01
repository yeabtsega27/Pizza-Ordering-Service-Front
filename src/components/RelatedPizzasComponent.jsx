import { Avatar, Box, Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { IMAGEBASEURL } from "../config/config";
import { Link } from "react-router-dom";
export default function RelatedPizzasComponent({ pizza }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          height: "450px",
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
            src={`${IMAGEBASEURL}${pizza?.image}`}
            sx={{
              width: "272px",
              height: "272px",
            }}
          ></Avatar>
        </Box>
        <Link to={`/order/${pizza.id}`}>
          <Typography
            fontSize={"25px"}
            fontWeight={800}
            sx={{ textAlign: "center" }}
          >
            {pizza?.name}
          </Typography>
        </Link>
        <Typography
          fontSize={"15px"}
          fontWeight={400}
          sx={{ textAlign: "center" }}
        >
          {pizza?.Toppings?.map((topping) => topping.name).join(",")}
        </Typography>
      </Box>
    </Grid>
  );
}
RelatedPizzasComponent.propTypes = {
  pizza: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
