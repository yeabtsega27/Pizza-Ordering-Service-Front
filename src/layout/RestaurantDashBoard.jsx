import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import DashboardNavbar from "./component/DashboardNavbar";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import SideBarItem from "./component/SideBarItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import Settings from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../hooks/useAuth";
import AxioxFatch from "../lib/axioxFatch";
import { IMAGEBASEURL } from "../config/config";

const menulist = [
  {
    icon: DashboardCustomizeOutlined,
    label: "Dashboard",
    to: "",
    object: "Dashboard",
  },
  {
    icon: BackpackOutlinedIcon,
    label: "Order",
    to: "order",
    object: "Orders",
  },

  {
    icon: PersonOutlineOutlinedIcon,
    label: "Roles",
    to: "roles",
    object: "Roles",
  },
  {
    icon: AccountCircleOutlinedIcon,
    label: "Users",
    to: "users",
    object: "restaurant_manager",
  },
  {
    icon: LocalPizzaOutlinedIcon,
    label: "Pizza Menu",
    to: "pizza-menu",
    object: "Pizza",
  },
  {
    icon: Settings,
    label: "Restaurant Setting",
    to: "setting",
    object: "Restaurant",
  },
];

export default function RestaurantDashBoard() {
  const { instance } = AxioxFatch();
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  const { removeAuth, Auth, abilities } = useAuth();
  const [restaurantInfo, setRestaurantInfo] = useState();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const res = await instance.get(
          `restaurants/${Auth.user?.restaurantsId}`
        );
        setRestaurantInfo(res.data); // Set fetched permissions to state
      } catch (error) {
        console.log(error);
      }
    };

    if (Auth.isAuthenticated) {
      fetchToppings();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect small screen sizes
  const [isOpen, setIsOpen] = useState(!isMobile); // Sidebar starts open on larger screens

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (menuItems.length === 0) {
      menulist.forEach((i) => {
        if (abilities?.can("read", i.object)) {
          setMenuItems((prev) => [...prev, i]);
        }
      });
    }
  }, [abilities, menuItems.length, navigate, pathname]);
  useEffect(() => {
    var curentPathe = pathname.split("/")[2] ?? "";
    const index = menuItems.findIndex((item) => curentPathe == item.to);

    if (index === -1 && menuItems.length > 0) {
      navigate(menuItems[0].to);
    }
  }, [menuItems, navigate, pathname]);

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? "258px" : 60, // Change width based on isOpen state
          height: "100vh", // Full height
          backgroundColor: "#f4f4f4", // Light gray background
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: "100%",
            height: "64px", // Full height
            display: "flex",
            transition: "width 0.3s",
            boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
            bgcolor: "#F3F3F340",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              width: isOpen ? "100%" : "0%", // Controls width transition
              whiteSpace: "nowrap", // Prevents wrapping to a new line
              overflow: "hidden", // Hides overflowing text
              textOverflow: "ellipsis", // Shows ellipsis for truncated text
              transition: "width 0.3s", // Smooth transition for width
            }}
          >
            {restaurantInfo?.name}
          </Typography>

          {/* Toggle Button */}
          <IconButton
            onClick={toggleSidebar}
            sx={{ alignSelf: isOpen ? "flex-end" : "center" }}
          >
            {isOpen ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            bgcolor: "#FF81000D",
            height: isOpen ? "113px" : "0",
            width: "100%",
            overflow: "hidden",
            transition: "height 0.3s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              objectFit: "contain",
              borderRadius: 0,
            }}
            src={`${IMAGEBASEURL}${restaurantInfo?.logo}`}
          ></Avatar>
        </Box>
        {/* Sidebar Content - List of Menu Items */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto", // Allow scrolling if content exceeds the viewport height
            mt: 2,
          }}
        >
          {menuItems.map((item) => (
            <SideBarItem
              key={item.to}
              label={item.label}
              to={item.to}
              Icon={item.icon}
            />
          ))}
          <Box
            sx={{
              my: 2,
              mx: "auto",
              width: "90%",
              height: "1px",
              bgcolor: "#0000001A",
            }}
          ></Box>
          <Box
            onClick={() => {
              removeAuth();
              navigate("/");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              py: 1,
            }}
          >
            <LogoutIcon
              sx={{
                mx: 1.8,
                fontSize: "30px",
                flex: "none",
                color: "#FF0000",
              }}
            />

            <Typography
              fontSize={16}
              fontWeight="bold"
              sx={{
                whiteSpace: "nowrap", // Prevent text from wrapping
                overflow: "hidden", // Hide overflowing text
                textOverflow: "ellipsis", // Show ellipsis for truncated text
                width: "100%",
                color: "#FF0000",
              }}
            >
              Log Out
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100px",
        }}
      >
        <DashboardNavbar />

        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            transition: "margin-left 0.3s",
            bgcolor: "#F8F8F8",
            height: "90vh",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={
              {
                //   bgcolor: "red",
                // height: "1000px",
              }
            }
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
