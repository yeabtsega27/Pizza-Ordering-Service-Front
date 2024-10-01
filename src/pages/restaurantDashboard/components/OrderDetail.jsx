import { Box, Chip, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
export default function OrderDetail({ setShow, data }) {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#00000090",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: 2,
          justifyContent: "start",
          alignItems: "end",
          flexDirection: "column",
          display: "flex",
          //   p: 5,
          //   height: "500px",
          width: "500px",
          pb: 5,
          gap: 1,
        }}
      >
        <IconButton onClick={() => setShow(false)}>
          <HighlightOffSharpIcon
            sx={{
              fontSize: "40px",
            }}
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            textAlign: "center",
            width: "100%",
          }}
        >
          Order Details
        </Typography>
        <Box
          sx={{
            width: "100%",
            px: 5,
            display: "flex",
            gap: 2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              justifyContent: "start",
              display: "flex",
              gap: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#00000080",
              }}
            >
              Name:
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#000000DE",
              }}
            >
              {data.Pizza?.name}
            </Typography>
          </Box>

          <Box
            sx={{
              justifyContent: "start",
              display: "flex",
              gap: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#00000080",
              }}
            >
              Topping:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data?.Toppings.map((topping, index) => (
                <Chip
                  key={index}
                  label={topping.name}
                  sx={{
                    bgcolor: getRandomColor(), // Apply random background color
                    color: "#fff", // Set text color to white for better contrast
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              justifyContent: "start",
              display: "flex",
              gap: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#00000080",
              }}
            >
              Quantity:
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#000000DE",
              }}
            >
              {data.amount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

OrderDetail.propTypes = {
  setShow: PropTypes.func.isRequired, // Label must be a string and is required
  data: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
