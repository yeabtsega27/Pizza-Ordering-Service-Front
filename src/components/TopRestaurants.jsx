import { Avatar, Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import { IMAGEBASEURL } from "../config/config";

export default function TopRestaurants({ restaurant }) {
  return (
    <Box
      sx={{
        height: "154px",
        width: "574px",
        background: "#FFFFFF",
        borderRadius: 4,
        display: "flex",
        overflow: "hidden",
        p: 3,
        flex: "none",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            mb: 1,
          }}
        >
          <Avatar
            height={"60px"}
            width={"60px"}
            src={`${IMAGEBASEURL}${restaurant?.logo}`}
          />

          <Typography
            sx={{
              fontSize: 20,
              color: "#000000",
              fontWeight: 600,
            }}
          >
            {restaurant?.name}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 15,
            color: "#00000080",
            fontWeight: 500,
            lineHeight: "15.75px",
            font: "Inter",
          }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to...
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          background: "#0080000D",
          borderRadius: 3,
          display: "flex",
          p: 1.5,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FF810033",
            borderRadius: 100,
            width: "80px",
            height: "80px",
          }}
        >
          <BatteryChargingFullIcon
            sx={{
              color: "#FF8100",
              fontSize: "60px",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            height: "80px",
          }}
        >
          <Typography fontSize={"14px"}>Number of order</Typography>
          <Typography
            fontSize={"50px"}
            variant="h1"
            color="#FF8100"
            fontWeight={700}
          >
            {restaurant?.orderCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

TopRestaurants.propTypes = {
  restaurant: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
