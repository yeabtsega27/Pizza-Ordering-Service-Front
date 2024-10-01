import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addUserSchema } from "../Schema";
import { useEffect, useState } from "react";
import { instance } from "../../../lib/axioxFatch";
import UseToast from "../../../hooks/UseToast";

export default function AddUser({ setShow, setData }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const { error } = UseToast();
  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await instance.get("roles/restaurant");
      setRoles(res.data.roles); // Set fetched permissions to state
    };

    fetchPermissions();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (formData) => {
    console.log("Form Data:", formData);
    try {
      const res = await instance.post("users/restaurant/adduser", {
        ...formData,
      });
      if (res.status === 201) {
        console.log(res.data);
        setData((prev) => {
          return { users: [...prev.users, res.data.user] };
        });
        setShow(false);
      }
    } catch (e) {
      console.error(e);
      if (e.response.data.errors)
        error("you need to feel all the the inputs")();
      error(e.response.data.msg)();
    }
  };
  const handleStatusChange = async (newStatus) => {
    console.log({ newStatus });
    setSelectedRole(newStatus);
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
          width: "500px",
          height: "90vh",
          pb: 5,
          gap: 1,
          overflow: "scroll",
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
          Add User
        </Typography>
        <Box
          sx={{
            width: "100%",
            px: 5,
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="nameame"
            name="name"
            autoComplete="name"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ height: "50px", p: 0 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ height: "50px", p: 0 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
            sx={{ height: "50px", p: 0 }}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Box>
                <Select
                  {...register("sub_role")}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  value={selectedRole}
                  sx={{}}
                  id="sub_role"
                  name="sub_role"
                  error={!!errors.sub_role}
                >
                  <MenuItem defaultChecked value={0}>
                    Select Role
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {console.log({ selectedRole })}
              {errors.sub_role && (
                <Typography color="error" variant="caption">
                  {errors.sub_role.message}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                bgcolor: "#FF8100",
                "&:hover": {
                  bgcolor: "#e6891d",
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

AddUser.propTypes = {
  setShow: PropTypes.func.isRequired, // Label must be a string and is required
  setData: PropTypes.func.isRequired, // Label must be a string and is required
  data: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
  add: PropTypes.bool.isRequired, // 'to' must be a string and is required (URL path)
};
