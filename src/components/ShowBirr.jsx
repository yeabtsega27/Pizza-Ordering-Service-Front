import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function ShowBirr({ price }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#01C550",
          fontSize: "45px",
        }}
      >
        {price}
      </Typography>
      <Typography sx={{ marginLeft: "5px", fontWeight: "thin" }}>
        Birr
      </Typography>
    </Box>
  );
}
ShowBirr.propTypes = {
  price: PropTypes.number.isRequired, // 'to' must be a string and is required (URL path)
};
