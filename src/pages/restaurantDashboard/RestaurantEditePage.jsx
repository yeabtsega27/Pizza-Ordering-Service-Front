import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editeRestaurant } from "./Schema/index"; // Update with your actual path
import { useEffect, useState } from "react";
import { instance } from "../../lib/axioxFatch";
import UseToast from "../../hooks/UseToast";
import useAuth from "../../hooks/useAuth";
import { Avatar } from "@mui/material";
import { IMAGEBASEURL } from "../../config/config";

export default function RestaurantEditePage() {
  const { error, success } = UseToast();

  const { Auth } = useAuth();
  const [logoFile, setLogoFile] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editeRestaurant),
    values: {
      name: restaurantInfo?.name ?? "",
      location: restaurantInfo?.location ?? "",
    },
  });
  useEffect(() => {
    const feachRestaurant = async () => {
      try {
        const res = await instance.get(
          `restaurants/${Auth.user.restaurantsId}`
        );
        setRestaurantInfo(res.data);
      } catch (e) {
        console.error(e);
        if (e.response.data.errors)
          error("you need to feel all the the inputs")();
        error(e.response.data.msg)();
      }
    };
    feachRestaurant();
  }, [Auth.user.restaurantsId]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    console.log(data);

    if (data.logo[0]) formData.append("logo", data.logo[0]);
    try {
      const res = await instance.put("restaurants", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        success("you have successfully update restaurant information")();
      }
    } catch (e) {
      console.error(e);
      if (e.response.data.errors)
        error("you need to feel all the the inputs")();
      error(e.response.data.msg)();
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minWidth: "400px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "150px",
            height: "150px",
            border: 2,
            borderColor: "red",
            borderRadius: 5,
            borderStyle: "dashed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {logoFile ? (
            <>
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  borderRadius: 5,
                }}
                src={URL.createObjectURL(logoFile)}
              ></Avatar>
            </>
          ) : (
            <>
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  borderRadius: 5,
                }}
                src={`${IMAGEBASEURL}${restaurantInfo?.logo}`}
              ></Avatar>
            </>
          )}
          <FileUploadOutlinedIcon sx={{ color: "#FF8100" }} />
          <Typography color="#FF8100">Upload Logo</Typography>
          <input
            id="logo"
            name="logo"
            style={{
              opacity: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            type="file"
            accept="image/*"
            {...register("logo")}
            onChange={handleLogoChange}
          />
        </Box>
        {errors.logo && (
          <Typography color="error" variant="caption">
            {errors.logo?.message}
          </Typography>
        )}
        <Box sx={{ width: "100%" }}>
          <Typography align="left" variant="caption">
            Name
          </Typography>
        </Box>
        <TextField
          required
          fullWidth
          id="name"
          autoFocus
          autoSave="a"
          name="name"
          autoComplete="name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Box sx={{ width: "100%", mt: 1 }}>
          <Typography align="left" variant="caption">
            Location
          </Typography>
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Location"
          name="location"
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "#FF9921",
            "&:hover": {
              bgcolor: "#e6891d",
            },
          }}
        >
          Save change
        </Button>
      </Box>
    </Box>
  );
}
