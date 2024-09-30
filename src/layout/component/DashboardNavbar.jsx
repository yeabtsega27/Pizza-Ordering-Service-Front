import { Box, Typography, IconButton, Avatar, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DashboardNavbar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#0000000D", // Background color
        px: 3, // Horizontal padding
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      {/* Page Title */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Page Title
      </Typography>

      {/* Right Side: Notifications and Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Notification Icon */}
        <IconButton aria-label="notifications">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile Avatar */}
        <IconButton>
          <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashboardNavbar;
