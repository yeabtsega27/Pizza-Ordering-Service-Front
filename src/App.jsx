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

function App() {
  const { Auth } = useAuth();
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
              <Route index element={<RestaurantOrders />} />
              <Route path="order" element={<RestaurantOrders />} />
              <Route path="roles" element={<RestaurantRoles />} />
              <Route path="users" element={<RestaurantUsers />} />
              <Route path="pizza-menu" element={<RestaurantPizzaMenu />} />
              <Route path="pizza-menu/add" element={<RestaurantAddPizza />} />
              <Route
                path="pizza-menu/edite/:pizzaId"
                element={<RestaurantAddPizza />}
              />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
