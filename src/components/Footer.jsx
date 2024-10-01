import SendIcon from "@mui/icons-material/Send";
import PizzaLogo from "../components/PizzaLogo";
import FacebookIcon from "../assets/SocalMediaIcons/Facebook.svg";
import LinkdinIcon from "../assets/SocalMediaIcons/Linkdin.svg";
import TwitterIcon from "../assets/SocalMediaIcons/Twitter.svg";
import YoutubeIcon from "../assets/SocalMediaIcons/Youtube.svg";
import { Avatar, Box, Link, TextField, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          px: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "241px",
          width: "100%",
          bgcolor: "#CCB691",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            gap: {
              xs: 2,
              md: 5,
            },
            flexDirection: {
              xs: "column", // column direction on extra-small screens
              md: "row", // row direction on small and larger screens
            },
          }}
        >
          <Link to="/home" sx={{ textDecoration: "none" }}>
            <Typography color="#16120DBF" fontSize={22} fontWeight="bold">
              Home
            </Typography>
          </Link>

          <Link to="/orders" sx={{ textDecoration: "none" }}>
            <Typography color="#16120DBF" fontSize={22} fontWeight={"bold"}>
              Order
            </Typography>
          </Link>
          <Link to="/" sx={{ textDecoration: "none" }}>
            <Typography color="#16120DBF" fontSize={22} fontWeight={"bold"}>
              About
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 5,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              maxWidth: "423px",
            }}
          >
            <PizzaLogo />
            <Box
              sx={{
                background: "#ffffff",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                border: 1,
                gap: 1,
                width: "100%",
                height: "62px",
              }}
            >
              <TextField
                placeholder="Your feedback"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    "& fieldset": {
                      border: "none", // Remove border
                    },
                    "&:hover fieldset": {
                      //   border: "none", // Remove border on hover
                    },
                    "&.Mui-focused fieldset": {
                      //   border: "none", // Remove border when focused
                    },
                    "& input": {
                      fontSize: 20, // Change this value to make text larger
                    },
                  },
                  width: "87%",

                  height: "62px",
                }}
                InputLabelProps={{
                  shrink: false, // Prevents label from shrinking
                  style: {
                    display: "none", // Hides label if you want to remove it
                  },
                }}
              />
              <SendIcon sx={{ fontSize: "40px", color: "#FF8100" }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          px: {
            xs: 1,
            md: 6,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: {
            xs: "162px",
            md: "110px",
          },
          width: "100%",
          bgcolor: "#000000",
          gap: {
            xs: 1,
            md: 2,
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",

            width: "100%",
            gap: {
              xs: 1,
              md: 2,
            },
            flexDirection: {
              xs: "column", // column direction on extra-small screens
              md: "row", // row direction on small and larger screens
            },
          }}
        >
          <Typography
            color="#ffffff"
            fontWeight={400}
            sx={{
              fontSize: {
                xs: "16px",
                md: "18px",
              },
            }}
          >
            @2024 Pizza All Rights Reserved.
          </Typography>
          <Typography color="#ffffff" fontSize={"18px"} fontWeight={400}>
            Terms & Conditions
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              md: "end",
            },
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Avatar
            src={FacebookIcon}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#141414",
              p: 1.4,
            }}
          ></Avatar>
          <Avatar
            src={LinkdinIcon}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#141414",
              p: 1.4,
            }}
          ></Avatar>
          <Avatar
            src={TwitterIcon}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#141414",
              p: 1.4,
            }}
          ></Avatar>
          <Avatar
            src={YoutubeIcon}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#141414",
              p: 1.4,
            }}
          ></Avatar>
        </Box>
      </Box>
    </>
  );
}
