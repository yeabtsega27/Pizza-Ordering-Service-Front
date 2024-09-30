import { Avatar, Box, Link, Typography } from "@mui/material";
import pizzaLogo from "../assets/pizzaLogo.png";

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
      <Link href="/" variant="body">
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
