import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import RegistrationRestaurantPage from "./pages/auth/RegistrationRestaurantPage";
import NavBar from "./layout/NavBar";
import RestaurantDashBoard from "./layout/RestaurantDashBoard";
import HomePage from "./pages/Landing/HomePage";
import OrdersPage from "./pages/Landing/OrdersPage";
import OrderPage from "./pages/Landing/OrderPage";
import RestaurantOrders from "./pages/restaurantDashboard/RestaurantOrders";
import RestaurantRoles from "./pages/restaurantDashboard/RestaurantRoles";
import RestaurantUsers from "./pages/restaurantDashboard/RestaurantUsers";
import RestaurantPizzaMenu from "./pages/restaurantDashboard/RestaurantPizzaMenu";
import RestaurantAddPizza from "./pages/restaurantDashboard/RestaurantAddPizza";
import useAuth from "./hooks/useAuth";
import RestaurantDashboardPage from "./pages/restaurantDashboard/RestaurantDashboardPage";
import RestaurantEditePage from "./pages/restaurantDashboard/RestaurantEditePage";
import.meta.env;

function App() {
  const { Auth, abilities } = useAuth();

  return (
    <>
      <Routes>
        {!Auth.isAuthenticated && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/registerrestaurant"
              element={<RegistrationRestaurantPage />}
            />
          </>
        )}
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/about" element={<>about page</>} />
          <Route path="*" element={<div>page not found</div>} />
        </Route>
        {Auth.isAuthenticated && Auth.user.role === "restaurant_manager" && (
          <>
            <Route path="/restaurant" element={<RestaurantDashBoard />}>
              {/* <Route
                index
                element={
                  <>
                    {" "}
                    <p>Welcome to the Dashboard</p>
                    <p>This is where your main content goes.</p>
                  </>
                }
              /> */}
              {abilities?.can("read", "Dashboard") && (
                <Route index element={<RestaurantDashboardPage />} />
              )}
              {abilities?.can("read", "Orders") && (
                <Route path="order" element={<RestaurantOrders />} />
              )}
              {abilities?.can("read", "Roles") && (
                <Route path="roles" element={<RestaurantRoles />} />
              )}
              {abilities?.can("read", "restaurant_manager") && (
                <Route path="users" element={<RestaurantUsers />} />
              )}
              {abilities?.can("read", "Pizza") && (
                <Route path="pizza-menu" element={<RestaurantPizzaMenu />} />
              )}
              {abilities?.can("create", "Pizza") && (
                <Route path="pizza-menu/add" element={<RestaurantAddPizza />} />
              )}
              {abilities?.can("edite", "Pizza") && (
                <Route
                  path="pizza-menu/edite/:pizzaId"
                  element={<RestaurantAddPizza />}
                />
              )}
              {abilities?.can("read", "Restaurant") && (
                <Route path="setting" element={<RestaurantEditePage />} />
              )}
              <Route path="*" element={<div>page not found</div>} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
