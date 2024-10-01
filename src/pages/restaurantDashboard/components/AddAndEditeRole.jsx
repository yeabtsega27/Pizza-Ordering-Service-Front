import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roleSchema } from "../Schema";
import { useEffect, useState } from "react";
import { instance } from "../../../lib/axioxFatch";
import UseToast from "../../../hooks/UseToast";

export default function AddAndEditRole({ data, setShow, add = true, setData }) {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [initialPermissions, setInitialPermissions] = useState([]);
  const { error } = UseToast();
  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await instance.get("per");
      setPermissions(res.data); // Set fetched permissions to state
    };

    if (!add && data.Permissions) {
      const initialPermIds = data.Permissions.map((p) => p.id);
      setSelectedPermissions(initialPermIds);
      setInitialPermissions(initialPermIds);
    }
    fetchPermissions();
  }, [add, data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
    values: { name: add ? "" : data.name },
  });

  const onSubmit = async (formData) => {
    const addedPermissions = selectedPermissions.filter(
      (id) => !initialPermissions.includes(id)
    );
    const removedPermissions = initialPermissions.filter(
      (id) => !selectedPermissions.includes(id)
    );

    console.log("Form Data:", formData);
    console.log("Added Permissions:", addedPermissions);
    console.log("Removed Permissions:", removedPermissions);
    if (!add) {
      try {
        const res = await instance.put(`roles/${data.id}`, {
          ...formData,
          addedPermissions,
          removedPermissions,
        });
        if (res.status === 200) {
          console.log(res.data);
          setData((prev) => {
            var roles = [...prev.roles];

            const index = roles.findIndex((r) => data.id == r.id);
            var editeRole = roles[index];
            editeRole.name = formData.name;
            editeRole.Permissions = permissions.filter((p) =>
              selectedPermissions.includes(p.id)
            );
            roles[index] = editeRole;

            console.log(editeRole);

            return { roles };
          });
          setShow(false);
        }
      } catch (e) {
        console.error(e);
        if (e.response.data.errors)
          error("you need to feel all the the inputs")();
        error(e.response.data.msg)();
      }
    } else {
      try {
        const res = await instance.post("roles/create", {
          ...formData,
          addedPermissions,
        });
        if (res.status === 201) {
          console.log(res.data);
          setData((prev) => {
            return { roles: [...prev.roles, res.data.role] };
          });
          setShow(false);
        }
      } catch (e) {
        console.error(e);
        if (e.response.data.errors)
          error("you need to feel all the the inputs")();
        error(e.response.data.msg)();
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(id)) {
        // Remove id if already selected
        return prev.filter((permId) => permId !== id);
      } else {
        // Add id if not selected
        return [...prev, id];
      }
    });
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
          Role
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
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 400,
              color: "#00000080",
              width: "100%",
            }}
          >
            Permissions
          </Typography>

          {/* Render list of permissions with checkboxes */}
          <Box>
            {permissions.map((permission) => {
              return (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      sx={{
                        // color: "#FF8100", // Sets the color of the unchecked checkbox
                        "&.Mui-checked": {
                          color: "#FF8100", // Sets the color of the checked checkbox
                        },
                      }}
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handleCheckboxChange(permission.id)}
                    />
                  }
                  label={permission.name}
                />
              );
            })}
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
            {add ? "Add" : "Update"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

AddAndEditRole.propTypes = {
  setShow: PropTypes.func.isRequired, // Label must be a string and is required
  setData: PropTypes.func.isRequired, // Label must be a string and is required
  data: PropTypes.object.isRequired, // 'to' must be a string and is required (URL path)
  add: PropTypes.bool.isRequired, // 'to' must be a string and is required (URL path)
};
