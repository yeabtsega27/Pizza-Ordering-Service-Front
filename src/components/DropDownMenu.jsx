import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

export default function DropDownMenu() {
  const location = useLocation();
  const { pathname } = location;

  const { Auth, removeAuth } = useAuth();

  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <Box
      sx={{
        gap: 10,
        alignItems: "center",
        display: {
          xs: "block",
          md: "none",
        },
        position: "relative",
      }}
    >
      <div onClick={() => setShowDropDown((value) => !value)}>
        <MenuIcon sx={{ fontSize: "40px", cursor: "pointer" }} />
      </div>

      <Box
        sx={{
          gap: 10,
          display: showDropDown ? "block" : "none",
          position: "absolute",
          bgcolor: "#ffffff",
          top: "35px",
          right: 0,
          minWidth: "200px",
          //   width: "300px",
          zIndex: 10,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          py: 2,
        }}
      >
        <Link
          to="/"
          sx={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              ":hover": {
                backgroundColor: "#FF810026", // Apply background color on hover
                color: "#FF8100", // Change text color (if needed)
              },
              display: "flex",
              alignItems: "center",
              gap: 3,
              py: 1,
              background: pathname.split("/")[1] == "" ? "#FF810066" : "",
            }}
          >
            {pathname.split("/")[1] == "" ? (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  bgcolor: "#FF8100",
                  borderRadius: 1,
                }}
              ></Box>
            ) : (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  borderRadius: 1,
                }}
              ></Box>
            )}
            <Typography
              color={pathname.split("/")[1] == "" ? "#FF8100" : "#000000"}
              fontSize={26}
              fontWeight="bold"
            >
              Home
            </Typography>
          </Box>
        </Link>
        <Link
          to="/orders"
          sx={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              ":hover": {
                backgroundColor: "#FF810026", // Apply background color on hover
                color: "#FF8100", // Change text color (if needed)
              },
              display: "flex",
              alignItems: "center",
              gap: 3,
              py: 1,
              background: pathname.split("/")[1] == "orders" ? "#FF810066" : "",
            }}
          >
            {pathname.split("/")[1] == "orders" ? (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  bgcolor: "#FF8100",
                  borderRadius: 1,
                }}
              ></Box>
            ) : (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  borderRadius: 1,
                }}
              ></Box>
            )}
            <Typography
              color={pathname.split("/")[1] == "orders" ? "#FF8100" : "#000000"}
              fontSize={26}
              fontWeight="bold"
            >
              Orders
            </Typography>
          </Box>
        </Link>
        <Link to="/">
          <Box
            sx={{
              ":hover": {
                backgroundColor: "#FF810026", // Apply background color on hover
                color: "#FF8100", // Change text color (if needed)
              },
              display: "flex",
              alignItems: "center",
              gap: 3,
              py: 1,
              background: pathname.split("/")[1] == "about" ? "#FF810066" : "",
            }}
          >
            {pathname.split("/")[1] == "about" ? (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  bgcolor: "#FF8100",
                  borderRadius: 1,
                }}
              ></Box>
            ) : (
              <Box
                sx={{
                  top: "40%",
                  width: "4px",
                  height: "30px",
                  borderRadius: 1,
                }}
              ></Box>
            )}
            <Typography
              color={pathname.split("/")[1] == "about" ? "#FF8100" : "#000000"}
              fontSize={26}
              fontWeight="bold"
            >
              Who we are
            </Typography>
          </Box>
        </Link>
        {Auth.isAuthenticated ? (
          <>
            {Auth.user.role == "customer" ? (
              <>
                <>
                  <Box
                    href="/"
                    sx={{
                      display: {
                        xs: "flex",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      onClick={() => removeAuth()}
                      sx={{
                        ":hover": {
                          backgroundColor: "#FF810026", // Apply background color on hover
                          color: "#FF8100", // Change text color (if needed)
                        },
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        py: 1,
                        width: "100%",

                        background:
                          pathname.split("/")[1] == "profile"
                            ? "#FF810066"
                            : "",
                      }}
                    >
                      {pathname.split("/")[1] == "profile" ? (
                        <Box
                          sx={{
                            top: "40%",
                            width: "4px",
                            height: "30px",
                            bgcolor: "#FF8100",
                            borderRadius: 1,
                          }}
                        ></Box>
                      ) : (
                        <Box
                          sx={{
                            top: "40%",
                            width: "4px",
                            height: "30px",
                            borderRadius: 1,
                          }}
                        ></Box>
                      )}
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
                  </Box>
                </>
              </>
            ) : (
              <>
                <Link
                  to="/restaurant"
                  sx={{
                    display: {
                      xs: "flex",
                    },
                    alignItems: "center",
                    textDecoration: "none",
                    gap: 3,
                    py: 1,
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#FF810026", // Apply background color on hover
                      color: "#FF8100", // Change text color (if needed)
                    },
                  }}
                >
                  <Box
                    sx={{
                      top: "40%",
                      width: "4px",
                      height: "30px",
                      borderRadius: 1,
                      ":hover": {
                        backgroundColor: "#FF810026", // Apply background color on hover
                        color: "#FF8100", // Change text color (if needed)
                      },
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
                      Restaurant
                    </Typography>
                  </Box>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/register">
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#FF890F",
                  borderRadius: 2,
                  display: {
                    xs: "flex",
                  },
                  m: 1,
                  py: 2,
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
              </Box>
            </Link>
            <Link to="/login">
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#FF890F",
                  borderRadius: 2,
                  display: {
                    xs: "flex",
                  },
                  m: 1,
                  py: 2,
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
                  Login
                </Typography>
              </Box>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}
