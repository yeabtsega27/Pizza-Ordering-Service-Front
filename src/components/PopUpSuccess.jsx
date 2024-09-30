import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function PopUpSuccess() {
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
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          p: 5,
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "80%",
            background: "#ffffff",
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "#05C6051A",
              width: "30vw",
              height: "30vw",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <CheckCircleIcon
              sx={{
                color: "#05C605",
                fontSize: "26vw",
              }}
            />
          </Box>
          <Typography
            sx={{
              color: "#05C605",
              fontSize: "3vw",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Your order has been successfully completed!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
