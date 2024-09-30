import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pizzaLogo from "../../assets/pizzaLogo.png";
import { registrationSchema } from "./Schema/index"; // Update with your actual path
import { Checkbox, FormControlLabel } from "@mui/material";
import PizzaLogo from "../../components/PizzaLogo";
import { instance } from "../../lib/axioxFatch";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UseToast from "../../hooks/UseToast";

export default function RegistrationPage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { error } = UseToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // Handle registration logic here
    try {
      const res = await instance.post("users/register", data);
      if (res.status == 201) {
        setAuth(res.data.user, res.data.token);

        navigate("/");
      }
      console.log(res);
    } catch (e) {
      console.log(e.response.data.message);

      error(e.response.data.message)();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Left Section: Form */}
      <Box
        sx={{
          flex: 1,
          display: { sm: "flex", xs: "none" }, // Flexbox
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#FF9921",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "100%", // Full width
            display: "flex", // Flexbox
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          }}
        >
          <Avatar
            sx={{
              width: 256,
              height: 256,
              objectFit: "contain",
              borderRadius: 0,
            }}
            src={pizzaLogo}
          ></Avatar>
        </Box>
      </Box>

      {/* Right Section: Form Inputs */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 4,
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <PizzaLogo />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              {...register("location")}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone_no"
              label="Phone Number"
              name="phone_no"
              {...register("phone_no")}
              error={!!errors.phone_no}
              helperText={errors.phone_no?.message}
            />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("acceptTerms")} // Register the checkbox
                    color="primary"
                  />
                }
                label="I accept the Terms and Conditions"
              />
            </Box>

            {errors.acceptTerms && (
              <Typography color="error" variant="caption">
                {errors.acceptTerms.message}
              </Typography>
            )}
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
              Sign Up
            </Button>
            <Box
              sx={{
                width: "100%", // Full width
                display: "flex", // Flexbox
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
              }}
            >
              <Typography>
                {"Already have an account?"}
                <Link href="/login" variant="body2">
                  {"Login"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
