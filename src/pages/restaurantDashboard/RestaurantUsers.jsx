/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/system";
import {
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import DeleteUser from "./components/DeleteUser";
import AddUser from "./components/AddUser";

export default function RestaurantUsers() {
  const { data, loading, setData } = useAxios({ basurl: "users/restaurant" });
  const [showRoleAdd, setShowAdd] = useState(false);
  const [showRoleDelete, setShowDelete] = useState(false);
  const [roleDeleteData, setRoleDeleteData] = useState({});

  const columns = useMemo(() => [
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
      size: 10,
    },

    {
      accessorKey: "phone_no", //access nested data with dot notation
      header: "Phone No",
    },
    {
      accessorKey: "email", //access nested data with dot notation
      header: "email",
    },
    {
      header: "Action",
      Cell: ({ row }) => {
        const [isChecked, setIsChecked] = useState(true);
        const handleChange = () => {
          setIsChecked((priv) => !priv);
        };
        return (
          <Box
            sx={{
              display: "flex",
              padding: "8px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: isChecked ? "#0080001A" : "#C5010115",
                borderRadius: 100,
                pl: 3,
                mx: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: 1,
                width: "150px",
              }}
            >
              <Typography sx={{ color: isChecked ? "#008000" : "#C50101" }}>
                {isChecked ? "Active" : "Inactive"}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        widows: "10px",
                        color: "#008000", // Solid green for the thumb when checked
                        "&:hover": {
                          backgroundColor: "#00800033", // Semi-transparent green on hover when checked
                        },
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#008000", // Solid green for the track when checked
                        },
                      "& .MuiSwitch-switchBase": {
                        color: "#C50101", // Semi-transparent green for the thumb when unchecked
                        "&:hover": {
                          backgroundColor: "#C5010135", // Semi-transparent green on hover when unchecked
                        },
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#C50101", // Semi-transparent green for the track when unchecked
                      },
                    }}
                    checked={isChecked}
                    onChange={handleChange}
                  />
                }
              />
            </Box>

            <IconButton
              onClick={() => {
                setShowDelete(true);
                setRoleDeleteData(row.original);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ]);
  const table = useMaterialReactTable({
    columns,
    data: data.users ?? [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    renderTopToolbarCustomActions: () => {
      return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Button
            variant="contained" // Adds background and styles
            //   onClick={handleAddRole}
            sx={{ bgcolor: "#FF8100", color: "#ffffff" }}
            onClick={() => setShowAdd(true)}
          >
            Add User
          </Button>
        </Box>
      );
    },
  });
  return (
    <>
      {showRoleDelete && (
        <DeleteUser
          setShow={setShowDelete}
          data={roleDeleteData}
          setData={setData}
        />
      )}
      {showRoleAdd && (
        <AddUser setShow={setShowAdd} data={{}} add={true} setData={setData} />
      )}
      {!loading && (
        <>
          <Box
            sx={{
              width: "100%",
              //   overflow: "scroll",
              //   "&::-webkit-scrollbar": {
              //     display: "none", // For Chrome, Safari, and Edge
              //   },
            }}
          >
            <MaterialReactTable table={table} />
          </Box>
        </>
      )}
    </>
  );
}
