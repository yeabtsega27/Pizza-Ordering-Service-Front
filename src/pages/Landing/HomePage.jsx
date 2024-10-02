import TextField from "@mui/material/TextField";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Frame from "../../assets/Frame.png";
import FeaturedPizza1 from "../../assets/FeaturedPizza1.png";
import Leef from "../../assets/Leef.png";
import SearchIcon from "@mui/icons-material/Search";
import TopRestaurants from "../../components/TopRestaurants";
import PizzasComponent from "../../components/PizzasComponent";
import { useEffect, useState } from "react";
import AxioxFatch from "../../lib/axioxFatch";

export default function HomePage() {
  const { instance } = AxioxFatch();
  const [restaurant, setRestaurant] = useState([]);
  const [popularPizzas, setPopularPizzas] = useState([]);
  const [fasting, setFasting] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await instance.get(`restaurants`);
        setRestaurant(res.data); // Set fetched permissions to state
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPopularPizzas = async () => {
      try {
        const res = await instance.get(`pizza`);
        setPopularPizzas(res.data.pizza); // Set fetched permissions to state
      } catch (error) {
        console.log(error);
      }
    };
    const fetchFasting = async () => {
      try {
        const res = await instance.get(`pizza`);
        setFasting(res.data.pizza); // Set fetched permissions to state
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularPizzas();
    fetchFasting();
    fetchRestaurants();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "50vw",

          background:
            "linear-gradient(to bottom, #ffffff, #FFC993,#FFC993, #FFF8F1)", // Define the vertical gradient
          alignItems: "center",
        }}
      >
        <Box
          pl={"7vw"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1vw",
          }}
        >
          <Typography
            fontSize={"8vw"}
            fontWeight={"bold"}
            sx={{
              background: "linear-gradient(to right, #FF8100, #FFBE71)", // Define your gradient colors
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", // Make text color transparent to show the gradient
            }}
          >
            Order us
          </Typography>
          <Typography variant="h6" fontSize={"1.7vw"}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
          </Typography>
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": {
                    border: "none", // Remove border
                  },
                  "&:hover fieldset": {
                    //   border: "none", // Remove border on hover
                  },
                  "&.Mui-focused fieldset": {
                    //   border: "none", // Remove border when focused
                  },
                  "& input": {
                    fontSize: "2vw", // Change this value to make text larger
                  },
                },
                width: "37vw",
              }}
              InputLabelProps={{
                shrink: false, // Prevents label from shrinking
                style: {
                  display: "none", // Hides label if you want to remove it
                },
              }}
            />

            <Box
              sx={{
                background: "#FF890F",
                width: "7vw",
                height: "7vw",
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 5,
                borderColor: "#ffffff",
              }}
            >
              <SearchIcon sx={{ fontSize: "5vw", color: "#ffffff" }} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: "20vw",
              height: "20vw",
              borderRadius: 0,
              position: "absolute",
              left: "5vw",
              top: "10vw",
              objectFit: "contain",
            }}
            src={Leef}
          />
          <Avatar
            sx={{
              width: "20vw",
              height: "20vw",
              borderRadius: 0,
              position: "absolute",
              bottom: "0vw",
              right: "10vw",
              objectFit: "contain",
              transform: "rotate(140deg)",
            }}
            src={Leef}
          />
          <Avatar
            sx={{
              width: "28vw",
              height: "100%",
              borderRadius: 0,
              position: "absolute",
              right: -25,
              top: 0,
              objectFit: "contain",
            }}
            src={Frame}
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: "#FFF8F1",
          p: "7vw",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            color: "#00000080",
            fontWeight: 600,
          }}
        >
          Featured pizza
        </Typography>
        <Box
          sx={{
            height: "30vw",
            width: "100%",
            background: "#2F2F2F",
            borderRadius: "2vw",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pl: "3vw",
              py: "3vw",

              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: "3vw",
                color: "#ffffff",
                fontWeight: 600,
                width: "80%",
              }}
            >
              Make Your First Order and Get{" "}
              <Typography
                component="span" // This ensures it doesn't create a new block
                sx={{
                  color: "#FF9921",

                  fontSize: "3vw",
                  fontWeight: 600,
                }}
              >
                50% Off
              </Typography>
            </Typography>
            <Typography variant="h6" color="#ffffff" fontSize={"1.5vw"}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without.
            </Typography>
            <Box
              sx={{
                bgcolor: "#FF9921",
                "&:hover": {
                  bgcolor: "#e6891d",
                },
                borderRadius: 1,

                px: 6,
                py: 1,
              }}
            >
              <Typography color="#ffffff" fontSize={"1.5vw"} fontWeight={500}>
                Order Now
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 0,
                objectFit: "contain",
              }}
              src={FeaturedPizza1}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pl: "7vw",
          display: "flex",
          flexDirection: "column",
          height: "442px",
          justifyContent: "center",
          gap: 2,
          background:
            "linear-gradient(to bottom, #FFF8F1, #FA7E0033,#FA7E0033, #FFF8F1)", // Define the vertical gradient
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            color: "#00000080",
            fontWeight: 600,
          }}
        >
          Top Restaurants
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "scroll",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          }}
        >
          {restaurant.map((r) => {
            return <TopRestaurants key={r.id} restaurant={r} />;
          })}
        </Box>
      </Box>
      <Box
        sx={{
          px: "7vw",
          display: "flex",
          flexDirection: "column",
          minHeight: "442px",
          justifyContent: "center",
          gap: 5,

          background: "#FFF8F1", // Define the vertical gradient
          pb: 8,
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            color: "#00000080",
            fontWeight: 600,
          }}
        >
          Popular Pizzas
        </Typography>
        <Grid container spacing={5}>
          {popularPizzas.map((pizza) => {
            return <PizzasComponent key={pizza.id} pizza={pizza} />;
          })}
        </Grid>
      </Box>
      <Box
        sx={{
          pl: "7vw",
          display: "flex",
          flexDirection: "column",
          minHeight: "442px",
          justifyContent: "center",
          gap: 5,
          pb: 8,
          background: "#FFF8F1", // Define the vertical gradient
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            color: "#00000080",
            fontWeight: 600,
          }}
        >
          Fasting
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "scroll",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          }}
        >
          {fasting.map((pizza) => {
            return <PizzasComponent key={pizza.id} pizza={pizza} />;
          })}
        </Box>
      </Box>
    </>
  );
}
