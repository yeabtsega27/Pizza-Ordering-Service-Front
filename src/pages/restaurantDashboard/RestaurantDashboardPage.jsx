/* eslint-disable react/prop-types */
import { Grid, Typography, Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { IMAGEBASEURL } from "../../config/config";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
const cardStyle = {
  bgcolor: "#ffffff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { color: "red" };
    case "Preparing":
      return { color: "#FFA500" };
    case "Ready":
      return { color: "#008000" };
    case "Delivered":
      return { color: "#008000" };
    default:
      return {};
  }
};
export default function RestaurantDashboardPage() {
  const { data, loading } = useAxios({ basurl: "dashboard" });

  if (loading) {
    return <div>loading</div>;
  }
  const recentOrdersColumns = [
    { accessorKey: "Pizza.name", header: "Pizza", size: 120 },
    { accessorKey: "status", header: "Status", size: 120 },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 120,
      Cell: ({ row }) => {
        const currentStatus = row.original.status;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ ...getStatusStyle(currentStatus) }}>
              {currentStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      accessorKey: "Pizza.image",
      size: 120,
      header: "Image",
      Cell: ({ row }) =>
        row.original.Pizza ? (
          <img
            src={`${IMAGEBASEURL}${row.original.Pizza.image}`}
            alt="Pizza"
            width="50"
            height="50"
          />
        ) : (
          "N/A"
        ),
    },
  ];

  const topSellingPizzasColumns = [
    {
      accessorKey: "Pizza.image",
      size: 10,
      header: "Image",
      Cell: ({ row }) =>
        row.original.Pizza ? (
          <img
            src={`${IMAGEBASEURL}${row.original.Pizza.image}`}
            alt="Pizza"
            width="50"
            height="50"
          />
        ) : (
          "N/A"
        ),
    },
    { accessorKey: "Pizza.name", header: "Pizza Name", size: 120 },
    { accessorKey: "sales", header: "Sales", size: 120 },
  ];

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: "stretch",
          mb: 5,
          minHeight: "150px",
        }}
      >
        <Grid item xs={12} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{data?.totalOrders}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${data?.totalRevenue}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="h6">Users Who Ordered</Typography>
            <Typography variant="h4">{data?.usersWhoOrdered}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="h6">Active Pizzas</Typography>
            <Typography variant="h4">{data?.activePizzas}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: "stretch",
        }}
      >
        {/* Display Total Orders, Total Revenue, etc. */}

        {/* Top Selling Pizzas Table */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Top Selling Pizzas
          </Typography>
          <MaterialReactTable
            columns={topSellingPizzasColumns}
            data={data?.topSellingPizzas ?? []}
            enableToolbarTop={false} // hides the top toolbar
            enableToolbarBottom={false} // hides the bottom toolbar
            enableKeyboardShortcuts={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
          />
        </Grid>

        {/* Recent Orders Table */}
        <Grid item xs={12} md={8}>
          <Link to={"order"}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
          </Link>
          <MaterialReactTable
            columns={recentOrdersColumns}
            data={data?.recentOrders ?? []}
            enableToolbarTop={false} // hides the top toolbar
            enableToolbarBottom={false} // hides the bottom toolbar
            enableKeyboardShortcuts={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
