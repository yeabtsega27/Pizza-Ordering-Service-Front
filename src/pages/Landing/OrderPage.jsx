import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import PizaImage from "../../assets/PizzaImage.png";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";
import ShowBirr from "../../components/ShowBirr";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";
import RelatedPizzasComponent from "../../components/RelatedPizzasComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance } from "../../lib/axioxFatch";
import { IMAGEBASEURL } from "../../config/config";
import UseToast from "../../hooks/UseToast";
import useAuth from "../../hooks/useAuth";
import PopUpSuccess from "../../components/PopUpSuccess";
export default function OrderPage() {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [popularPizzas, setPopularPizzas] = useState([]);
  const { error } = UseToast();
  const { Auth } = useAuth();
  const navigate = useNavigate();

  const sendOrder = async () => {
    if (Auth.isAuthenticated) {
      if (selectedToppings.length == 0) {
        error("select at least one topping ")();
      }
      try {
        // console.log(selectedToppings);
        const res = await instance.post("orders/create", {
          pizaId: id,
          toppingIds: selectedToppings,
          amount,
        });
        if (res.status === 201) {
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/orders");
          }, 500);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data.msg);
        error(error.response.data.msg)();
      }
    } else {
      navigate("/login");
    }
  };
  const handleCheckboxChange = (id) => {
    setSelectedToppings((prev) => {
      if (prev.includes(id)) {
        // Remove id if already selected
        return prev.filter((permId) => permId !== id);
      } else {
        // Add id if not selected
        return [...prev, id];
      }
    });
  };

  const addMount = () => {
    setAmount((prev) => {
      setPrice(pizza?.price * (prev + 1));
      return prev + 1;
    });
  };
  const minAmount = () => {
    setAmount((prev) => {
      if (prev > 1) {
        setPrice(pizza?.price * (prev + 1));
        return prev - 1;
      }
      return prev;
    });
  };

  useEffect(() => {
    const feactPizza = async () => {
      try {
        const res = await instance.get(`pizza/${id}`);
        setPizza(res.data.pizza);
        setPrice(res.data.pizza?.price);
        setAmount(1);
        setSelectedToppings(res.data.pizza?.Toppings.map((t) => t.id));
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
    fetchPopularPizzas();
    feactPizza();
  }, [id]);

  return (
    <>
      {showSuccess && (
        <>
          <PopUpSuccess />
        </>
      )}
      <Box
        sx={{
          background: "#FFF8F1",
        }}
      >
        <Box
          sx={{
            width: "90%",
            m: "auto",
            display: "flex",
            gap: 7,
            pb: 10,
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              m: "auto",
              display: "flex",

              gap: 4,
            }}
          >
            <Box
              sx={{
                width: {
                  md: "35vw",
                  xs: "40vw",
                },
                height: {
                  md: "35vw",
                  xs: "40vw",
                },
                bgcolor: "#EA810033",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1000,
              }}
            >
              <Avatar
                src={`${IMAGEBASEURL}${pizza?.image}`}
                sx={{
                  width: {
                    md: "32vw",
                    xs: "35vw",
                  },
                  height: {
                    md: "32vw",
                    xs: "35vw",
                  },
                }}
              ></Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: {
                    md: "16vw",
                    xs: "20vw",
                  },
                  height: {
                    md: "16vw",
                    xs: "20vw",
                  },
                  bgcolor: "#EA810033",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1000,
                }}
              >
                <Avatar
                  src={PizaImage}
                  sx={{
                    width: {
                      md: "14vw",
                      xs: "17vw",
                    },
                    height: {
                      md: "14vw",
                      xs: "17vw",
                    },
                  }}
                ></Avatar>
              </Box>
              <Box
                sx={{
                  width: {
                    md: "16vw",
                    xs: "20vw",
                  },
                  height: {
                    md: "16vw",
                    xs: "20vw",
                  },
                  bgcolor: "#EA810033",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1000,
                }}
              >
                <Avatar
                  src={PizaImage}
                  sx={{
                    width: {
                      md: "14vw",
                      xs: "17vw",
                    },
                    height: {
                      md: "14vw",
                      xs: "17vw",
                    },
                  }}
                ></Avatar>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              m: "auto",
              gap: 4,
              justifyContent: "start",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "30px",
                  md: "40px",
                  lg: "60px",
                },
                fontWeight: "700",
              }}
            >
              {pizza?.name}
            </Typography>
            <Box sx={{ pb: 4 }}>
              {pizza?.Toppings.map((topping) => {
                return (
                  <FormControlLabel
                    key={topping.id}
                    control={
                      <Checkbox
                        checked={selectedToppings.includes(topping.id)}
                        onChange={() => handleCheckboxChange(topping.id)}
                        value="remember"
                        color="primary"
                        sx={{
                          color: "#FF8100", // Unchecked color
                          "&.Mui-checked": {
                            color: "#FF8100", // Checked color
                          },
                        }}
                      />
                    }
                    label={topping.name}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  onClick={() => {
                    minAmount();
                  }}
                  sx={{
                    display: "flex",
                    border: 3,
                    borderColor: "#FF8100",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <RemoveTwoToneIcon
                    sx={{
                      fontSize: {
                        xs: "25px",
                        md: "30px",
                        lg: "35px",
                      },
                      lineHeight: 10,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    px: {
                      xs: 3,
                      md: 4,
                      lg: 5,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "30px",
                        md: "40px",
                        lg: "50px",
                      },
                      fontWeight: 500,
                    }}
                  >
                    {amount}
                  </Typography>
                </Box>
                <Box
                  onClick={() => {
                    addMount();
                  }}
                  sx={{
                    display: "flex",
                    border: 3,
                    borderColor: "#FF8100",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <AddTwoToneIcon
                    sx={{
                      fontSize: {
                        xs: "25px",
                        md: "30px",
                        lg: "35px",
                      },
                    }}
                  />
                </Box>
              </Box>
              <ShowBirr price={price} />
            </Box>
            <Box
              onClick={() => {
                sendOrder();
              }}
              sx={{
                width: "100%",
                m: "auto",
                px: 3,
                py: 2,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                background: "#FF8100",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "25px",
                    md: "33px",
                    lg: "40px",
                  },
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              >
                Order
              </Typography>
              <ArrowOutwardTwoToneIcon
                sx={{
                  fontSize: {
                    xs: "30px",
                    md: "40px",
                    lg: "60px",
                  },
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              />
            </Box>
          </Box>
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
          }}
        >
          <Typography
            sx={{
              fontSize: 30,
              color: "#00000080",
              fontWeight: 600,
            }}
          >
            Related
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
            {popularPizzas?.map((pizza) => {
              return <RelatedPizzasComponent key={pizza.id} pizza={pizza} />;
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
