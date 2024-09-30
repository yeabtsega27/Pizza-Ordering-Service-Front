/* eslint-disable react/prop-types */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"; /* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import useAxios from "../../hooks/useAxios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/system";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { IMAGEBASEURL } from "../../config/config";
import PizzaDetail from "./components/PizzaDetail";
import DeletePizza from "./components/DeletePizza";
import { Link } from "react-router-dom";

export default function RestaurantPizzaMenu() {
  const { data, loading, setData } = useAxios({ basurl: "pizza/restaurant" });
  const [showRoleDelete, setShowDelete] = useState(false);
  const [roleDeleteData, setRoleDeleteData] = useState({});

  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: "image", //access nested data with dot notation
      header: "image",
      Cell: ({ row }) => {
        console.log(row.original.image);

        return (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              src={`${IMAGEBASEURL + row.original.image}`}
            ></Avatar>
          </Box>
        );
      },
      size: -1,
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
      size: 10,
    },
    {
      accessorKey: "Toppings", //access nested data with dot notation
      header: "Topping",
      Cell: ({ row }) => {
        return (
          <Box
            onClick={() => {
              setShowOrderDetail(true), setOrderDetailData(row.original);
            }}
            sx={{ display: "flex", gap: 1, cursor: "pointer" }}
          >
            <RemoveRedEyeIcon sx={{ color: "#FF8100" }} />
            <Typography sx={{ color: "#FF8100" }}>Topping</Typography>
          </Box>
        );
      },
    },
    {
      accessorKey: "price", //access nested data with dot notation
      header: "price",
      Cell: ({ row }) => {
        console.log();

        return (
          <Box
            onClick={() => {
              // setShowOrderDetail(true), setOrderDetailData(row.original);
            }}
            sx={{ display: "flex", gap: 1, cursor: "pointer" }}
          >
            <Typography sx={{ color: "#008000", fontSize: "22px" }}>
              ${row.original.price}
            </Typography>
          </Box>
        );
      },
    },

    {
      header: "Action",
      Cell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              padding: "8px",
              alignItems: "center",
            }}
          >
            <Link to={`edite/${row.original.id}`}>
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </Link>

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
    data: data.pizza ?? [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    renderTopToolbarCustomActions: () => {
      return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Link to={"add"}>
            <Button
              variant="contained" // Adds background and styles
              //   onClick={handleAddRole}
              sx={{ bgcolor: "#FF8100", color: "#ffffff" }}
              // onClick={() => setShowAdd(true)}
            >
              Add Pizza
            </Button>
          </Link>
        </Box>
      );
    },
  });
  return (
    <>
      {showRoleDelete && (
        <DeletePizza
          setShow={setShowDelete}
          data={roleDeleteData}
          setData={setData}
        />
      )}
      {showOrderDetail && (
        <PizzaDetail setShow={setShowOrderDetail} data={orderDetailData} />
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
