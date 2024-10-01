import { Box, Button, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { instance } from "../../../lib/axioxFatch";
import UseToast from "../../../hooks/UseToast";

export default function DeleteUser({ setShow, data, setData }) {
  const { error } = UseToast();

  const onsubmit = async () => {
    try {
      const res = await instance.delete(`users/${data.id}`);
      if (res.status === 200) {
        setData((prev) => {
          return { users: prev.users.filter((r) => !(r.id === data.id)) };
        });
      }
    } catch (e) {
      console.error(e);
      if (e.response.data.errors)
        error("you need to feel all the the inputs")();
      error(e.response.data.msg)();
    }
    setShow(false);
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
          Are you sure you want to delete
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
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#000000DE",
              textAlign: "center",
            }}
          >
            {data.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            px: 5,
            display: "flex",
            gap: 2,
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={() => onsubmit()}
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#ffffff",
              bgcolor: "#C50101",
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setShow(false)}
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#ffffff",
              bgcolor: "gray",
            }}
          >
            Cancle
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

DeleteUser.propTypes = {
  setShow: PropTypes.func.isRequired, // Label must be a string and is required
  setData: PropTypes.func.isRequired, // Label must be a string and is required
  data: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
};
