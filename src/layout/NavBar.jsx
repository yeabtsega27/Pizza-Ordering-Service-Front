import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Avatar, Box, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import pizzaLogo from "../assets/pizzaLogo.png";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import DropDownMenu from "../components/DropDownMenu";

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
export default function NavBar() {
  const location = useLocation();
  const { pathname } = location;

  const { Auth, removeAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "rgba(255, 129, 0, 0.01)",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex", // Flexbox
          justifyContent: "space-between",
          px: 4,
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex", // Flexbox
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              objectFit: "contain",
              borderRadius: 0,
            }}
            src={pizzaLogo}
          ></Avatar>
          <Typography color="#AF5901" fontSize={26} fontWeight={"bold"}>
            Pizza
          </Typography>
        </Box>
        <Box
          sx={{
            gap: 10,
            alignItems: "center",
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/" sx={{ textDecoration: "none" }}>
            <Typography
              color={pathname.split("/")[1] == "" ? "#FF8100" : "#000000"}
              fontSize={pathname.split("/")[1] == "" ? 26 : 22}
              fontWeight={pathname.split("/")[1] == "" ? "bold" : ""}
            >
              Home
            </Typography>
          </Link>

          <Link href="/orders" sx={{ textDecoration: "none" }}>
            <Typography
              color={pathname.split("/")[1] == "orders" ? "#FF8100" : "#000000"}
              fontSize={pathname.split("/")[1] == "orders" ? 26 : 22}
              fontWeight={pathname.split("/")[1] == "orders" ? "bold" : ""}
            >
              Orders
            </Typography>
          </Link>
          <Link href="/about" sx={{ textDecoration: "none" }}>
            <Typography
              color={pathname.split("/")[1] == "about" ? "#FF8100" : "#000000"}
              fontSize={pathname.split("/")[1] == "about" ? 26 : 22}
              fontWeight={pathname.split("/")[1] == "about" ? "bold" : ""}
            >
              Who we are
            </Typography>
          </Link>
        </Box>
        {Auth.isAuthenticated ? (
          <>
            {Auth.user.role == "customer" ? (
              <>
                <Box
                  onClick={() => {
                    removeAuth();
                    navigate("/");
                  }}
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    cursor: "pointer",
                    alignItems: "center",
                    gap: 3,
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      top: "40%",
                      width: "4px",
                      height: "30px",
                      borderRadius: 1,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#FF8100",
                      gap: 1,
                    }}
                  >
                    <ExitToAppOutlinedIcon
                      sx={{
                        fontSize: "30px",
                        color:
                          pathname.split("/")[1] == "profile "
                            ? "#FF8100"
                            : "#000000",
                      }}
                    />
                    <Typography
                      color={
                        pathname.split("/")[1] == "profile "
                          ? "#FF8100"
                          : "#000000"
                      }
                      fontSize={26}
                      fontWeight="bold"
                    >
                      Log Out
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Link
                  href="/restaurant"
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    alignItems: "center",
                    textDecoration: "none",
                    gap: 3,
                    py: 1,
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      top: "40%",
                      width: "4px",
                      height: "30px",
                      borderRadius: 1,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#FF8100",
                      gap: 1,
                    }}
                  >
                    <RestaurantOutlinedIcon
                      sx={{
                        fontSize: "30px",
                        color:
                          pathname.split("/")[1] == "profile "
                            ? "#FF8100"
                            : "#000000",
                      }}
                    />
                    <Typography
                      color={
                        pathname.split("/")[1] == "profile "
                          ? "#FF8100"
                          : "#000000"
                      }
                      fontSize={26}
                      fontWeight="bold"
                    >
                      Restorant
                    </Typography>
                  </Box>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link
              // type="submit"
              href="/register"
              sx={{
                textDecoration: "none",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#FF890F",
                borderRadius: 2,
                cursor: "pointer",
                display: {
                  xs: "none",
                  md: "flex",
                },
                px: 5,
                "&:hover": {
                  bgcolor: "#e6891d",
                },
              }}
            >
              <Typography
                color="#ffffff"
                fontWeight={"bold"}
                sx={{
                  fontSize: "18px",
                }}
              >
                Register
              </Typography>
            </Link>
          </>
        )}

        <DropDownMenu />
      </Box>
      <Box
        sx={{
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
