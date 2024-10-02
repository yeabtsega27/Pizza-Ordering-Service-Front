import { Avatar, Box, Typography } from "@mui/material";
import pizzaLogo from "../assets/pizzaLogo.png";
import { Link } from "react-router-dom";

export default function PizzaLogo() {
  return (
    <Box
      sx={{
        width: "100%", // Full width
        display: "flex", // Flexbox
        justifyContent: "left", // Center horizontally
        alignItems: "center", // Center vertically
        gap: 2,
        mb: 4,
      }}
    >
      <Link to="/" variant="body">
        <Avatar
          sx={{
            width: 56,
            height: 56,
            objectFit: "contain",
            borderRadius: 0,
          }}
          src={pizzaLogo}
        ></Avatar>
      </Link>
      <Typography variant="h3" fontSize={30} color="#AF5901">
        Pizza
      </Typography>
    </Box>
  );
}
