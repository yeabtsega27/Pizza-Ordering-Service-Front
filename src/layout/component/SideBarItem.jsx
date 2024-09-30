import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function SideBarItem({ label, to, Icon }) {
  const location = useLocation();
  const { pathname } = location;
  const isActive =
    pathname.split("/")[2] === to.split("/")[0] ||
    (pathname.split("/")[2] === undefined && to.split("/")[0] == "order");

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: isActive ? "#FF8100" : "#000", // Highlight the active item
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
          py: 1,
          background: isActive ? "#FF810066" : "", // Background color for active path
          transition: "background 0.3s",
        }}
      >
        {/* Active Indicator */}
        <Box
          sx={{
            width: "4px",
            height: "30px",
            bgcolor: isActive ? "#FF8100" : "transparent", // Conditional color
            borderRadius: 1,
            flex: "none",
          }}
        ></Box>

        {/* Dynamic Icon passed as prop */}
        {Icon && (
          <Icon
            sx={{
              mx: 1.7,
              ml: 1.5,
              fontSize: "30px",
              flex: "none",
            }}
          />
        )}

        <Typography
          fontSize={16}
          fontWeight="bold"
          sx={{
            whiteSpace: "nowrap", // Prevent text from wrapping
            overflow: "hidden", // Hide overflowing text
            textOverflow: "ellipsis", // Show ellipsis for truncated text
            width: "100%",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
}

// Prop validation
SideBarItem.propTypes = {
  label: PropTypes.string.isRequired, // Label must be a string and is required
  to: PropTypes.string.isRequired, // 'to' must be a string and is required (URL path)
  Icon: PropTypes.elementType, // Icon is optional, but if provided should be a Material-UI Icon component
};
