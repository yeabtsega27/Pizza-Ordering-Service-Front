/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import CheckIcon from "@mui/icons-material/Check";
import { useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/system";
import { datToString } from "../../utils/dateToString";
import { Avatar, MenuItem, Select, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the arrow down icon
import OrderDetail from "./components/OrderDetail";
import { instance } from "../../lib/axioxFatch";
import UseToast from "../../hooks/UseToast";
import { IMAGEBASEURL } from "../../config/config";

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { bgcolor: "red" };
    case "Preparing":
      return { bgcolor: "#FFA500" };
    case "Ready":
      return { bgcolor: "#008000" };
    default:
      return {};
  }
};

export default function RestaurantOrders() {
  const { data, loading, setData } = useAxios({ basurl: "orders/restaurant" });
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState(null);

  const { error } = UseToast();

  const handleStatusChange = async (orderId, newStatus) => {
    const orders = data.orders;
    const index = orders.findIndex((o) => o.id == orderId);

    try {
      const res = await instance.put(`orders/${orderId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        if (index != -1) {
          var temp = orders[index];
          temp.status = newStatus;
          var orderTemp = orders;
          orderTemp[index] = temp;
          setData({ orders: orderTemp });
        }
      }
    } catch (e) {
      console.log(e);

      error(e.respons.data.msg)();
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "Pizza.name", //access nested data with dot notation
      header: "Name",
      Cell: ({ row }) => {
        console.log(row.original);

        return (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              sx={{ width: "20px", height: "20px" }}
              src={`${IMAGEBASEURL + row.original.Pizza?.image}`}
            ></Avatar>
            <Typography sx={{ fontSize: "14px", color: "#000000DE" }}>
              {row.original.Pizza?.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      accessorKey: "Pizza.Toppings", //access nested data with dot notation
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
      accessorKey: "amount", //access nested data with dot notation
      header: "Quantity",
    },
    {
      accessorKey: "User.phone_no", //access nested data with dot notation
      header: "Customer No",
    },
    {
      accessorKey: "createdAt", //access nested data with dot notation
      header: "Created at",
      Cell: ({ cell }) => datToString(cell.getValue()),
    },
    {
      accessorKey: "status", //access nested data with dot notation
      header: "Status",
      Cell: ({ row }) => {
        const currentStatus = row.original.status;
        const orderId = row.original.id;

        return currentStatus !== "Delivered" ? (
          <Select
            value={currentStatus}
            onChange={(e) => handleStatusChange(orderId, e.target.value)}
            IconComponent={KeyboardArrowDownIcon} // Custom arrow icon component
            sx={{
              ...getStatusStyle(currentStatus),
              color: "white",
              border: "none",
              borderRadius: "5px", // Rounded corners
              height: "40px",
              "& fieldset": { border: "none" }, // Remove border for focused state
              "& .MuiSvgIcon-root": {
                color: "white", // Arrow down color
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
            }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="Ready">Ready</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <CheckIcon sx={{ color: "#008000" }} />
            <Typography sx={{ color: "#008000" }}>Delivered</Typography>
          </Box>
        );
      },
    },
  ]);
  const table = useMaterialReactTable({
    columns,
    data: data.orders ?? [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });
  return (
    <>
      {showOrderDetail && (
        <OrderDetail setShow={setShowOrderDetail} data={orderDetailData} />
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
