import { Avatar, Box, Grid, Typography } from "@mui/material";

import PizaImage from "../assets/PizzaImage.png";
export default function RelatedPizzasComponent() {
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
            src={PizaImage}
            sx={{
              width: "272px",
              height: "272px",
            }}
          ></Avatar>
        </Box>
        <Typography
          fontSize={"25px"}
          fontWeight={800}
          sx={{ textAlign: "center" }}
        >
          Margherita
        </Typography>
        <Typography
          fontSize={"15px"}
          fontWeight={400}
          sx={{ textAlign: "center" }}
        >
          Tomato, Mozzarella, Bell Peppers, Onions, Olives
        </Typography>
      </Box>
    </Grid>
  );
}
