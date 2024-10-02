import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pizzaLogo from "../../assets/pizzaLogo.png";
import { loginSchema } from "./Schema/index";
import PizzaLogo from "../../components/PizzaLogo";
import AxioxFatch from "../../lib/axioxFatch";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { instance } = AxioxFatch();
  const { setAuth } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // Handle registration logic here
    const res = await instance.post("users/login", data);
    if (res.status == 200) {
      setAuth(res.data.user, res.data.token);
      navigate("/");
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

      {/* Right Section: Background and Logo */}

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

          <Typography component="h1" variant="h5">
            Logi In
          </Typography>
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#FF8100",
                "&:hover": {
                  bgcolor: "#e6891d",
                },
              }}
            >
              Logi In
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
                {"Don't have an account?"}
                <Link to="/register" variant="body2">
                  {" Sign Up"}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
