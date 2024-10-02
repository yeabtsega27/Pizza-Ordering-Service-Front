import AddIcon from "@mui/icons-material/Add";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editePizzaSchema, pizzaSchema } from "./Schema";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AxioxFatch from "../../lib/axioxFatch";
import UseToast from "../../hooks/UseToast";

export default function RestaurantAddPizza() {
  const { instance } = AxioxFatch();
  const [toppings, setTopping] = useState([]);
  const [pizza, setPizza] = useState({});
  const navigate = useNavigate();
  const { pizzaId } = useParams();
  const location = useLocation();
  const { pathname } = location;
  //   console.log(pathname.split("/"));

  const isAdd = pathname.split("/")[3] === "add";

  const { error } = UseToast();

  const [imageFile, setImageFile] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [newAddedToppings, setAddedToppings] = useState([]);
  const [initialToppings, setInitialToppings] = useState([]);

  useEffect(() => {
    const fetchToppings = async () => {
      const res = await instance.get("topping/restaurant");
      setTopping(res.data.toppings); // Set fetched permissions to state
    };

    fetchToppings();
  }, []);
  useEffect(() => {
    if (!isAdd && pizza.Toppings) {
      const initialToppingIds = pizza?.Toppings.map((p) => p.id);
      setSelectedToppings(initialToppingIds);
      setInitialToppings(initialToppingIds);
    }
  }, [isAdd, pizza.Toppings]);
  useEffect(() => {
    const fetchPizza = async () => {
      const res = await instance.get(`pizza/${pizzaId}`);
      setPizza(res.data.pizza); // Set fetched permissions to state
    };
    if (!isAdd) fetchPizza();
  }, [pizzaId, isAdd]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isAdd ? pizzaSchema : editePizzaSchema),
    values: {
      name: pizza.name ?? "",
      price: pizza.price ? `${pizza.price}` : "",
    },
  });
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
  const handleAddedCheckboxChange = (index) => {
    setAddedToppings((prev) => {
      if (prev[index]) {
        // Remove id if already selected
        return prev.map((val, i) => {
          if (i == index) {
            return { ...val, selected: !val.selected };
          }
          return val;
        });
      }
    });
  };
  const handleAddedValueboxChange = (value, index) => {
    setAddedToppings((prev) => {
      if (prev[index]) {
        // Remove id if already selected
        return prev.map((val, i) => {
          if (i == index) {
            return { ...val, value: value };
          }
          return val;
        });
      }
    });
  };
  const onSubmit = async (data) => {
    const addedToppings = selectedToppings.filter(
      (id) => !initialToppings.includes(id)
    );
    const removedToppings = initialToppings.filter(
      (id) => !selectedToppings.includes(id)
    );
    const formData = new FormData();

    // Append text data fields
    formData.append("name", data.name);
    formData.append("price", data.price);

    if (isAdd) {
      console.log({ data, selectedToppings, newAddedToppings });

      try {
        // Append the image file
        formData.append("image", data.image[0]);

        formData.append("selectedToppings", JSON.stringify(selectedToppings));

        formData.append("addedToppings", JSON.stringify(newAddedToppings));

        // Send the form data using Axios
        const res = await instance.post("pizza/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 201) {
          navigate("/restaurant/pizza-menu");
        }
      } catch (e) {
        console.error(e);
        if (e.response.data.errors)
          error("you need to feel all the the inputs")();
        error(e.response.data.msg)();
      }
    } else {
      console.log({
        data,
        addedToppings,
        newAddedToppings,
        removedToppings,
      });

      if (data.image[0]) formData.append("image", data.image[0]);

      formData.append("addedToppings", JSON.stringify(addedToppings));
      formData.append("removedToppings", JSON.stringify(removedToppings));

      formData.append("newAddedToppings", JSON.stringify(newAddedToppings));

      console.log(formData.get("image"));

      const res = await instance.put(`pizza/${pizzaId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        navigate("/restaurant/pizza-menu");
      }
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  return (
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
        // label="Name"
        placeholder="Name"
        name="name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ height: "50px", p: 0 }}
      />
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: 400,
          color: "#00000080",
          width: "100%",
        }}
      >
        Toppings
      </Typography>

      {/* Render list of permissions with checkboxes */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {toppings.map((topping) => {
          return (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  sx={{
                    // color: "#FF8100", // Sets the color of the unchecked checkbox
                    "&.Mui-checked": {
                      color: "#FF8100", // Sets the color of the checked checkbox
                    },
                  }}
                  checked={selectedToppings.includes(topping.id)}
                  onChange={() => handleCheckboxChange(topping.id)}
                />
              }
              label={topping.name}
            />
          );
        })}
        {newAddedToppings.map((value, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: 0,
                alignItems: "center",
                width: "30%",
              }}
              key={index}
            >
              <FormControlLabel
                sx={{
                  m: 0, // Removes all margins
                  p: 0, // Removes all padding
                }}
                control={
                  <Checkbox
                    sx={{
                      p: 0, // Removes padding inside the Checkbox
                      "&.Mui-checked": {
                        color: "#FF8100", // Sets the color of the checked checkbox
                      },
                    }}
                    checked={value.selected}
                    onChange={() => handleAddedCheckboxChange(index)}
                  />
                }
              />

              <TextField
                margin="none"
                autoFocus
                onChange={(e) =>
                  handleAddedValueboxChange(e.target.value, index)
                }
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiOutlinedInput-root": {
                    height: "30px", // Adjust height for more compact look
                    "& fieldset": {
                      borderColor: "#FF8100", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#FF8100", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FF8100", // Border color on focus
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px", // Smaller font size for label
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px", // Smaller font size for input text
                    padding: "1px 12px", // Adjust input padding
                  },
                  "& .MuiFormHelperText-root": {
                    margin: 1, // Remove extra margin from helper text
                  },
                }}
              />
            </Box>
          );
        })}
        <Button
          onClick={() =>
            setAddedToppings((prev) => [
              ...prev,
              { selected: false, value: "" },
            ])
          }
          variant="contained"
          sx={{
            px: 3,
            bgcolor: "#FF8100",
            "&:hover": {
              bgcolor: "#e6891d",
            },
          }}
        >
          <AddIcon />
          Add
        </Button>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        // label="Price"
        name="Price"
        placeholder="Price"
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
        sx={{ height: "50px", p: 0 }}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "50px",
          border: 2,
          borderColor: "red",
          borderRadius: 2,
          borderStyle: "dashed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FileUploadOutlinedIcon sx={{ color: "#FF8100" }} />
        <Typography color="#FF8100">Upload Pizza Photo</Typography>
        <input
          id="image"
          name="image"
          style={{
            opacity: "0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
        />
      </Box>
      {errors.image && (
        <Typography color="error" variant="caption">
          {errors.image?.message}
        </Typography>
      )}
      {imageFile && (
        <>
          <Typography variant="caption">{imageFile.name}</Typography>
        </>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{
          px: 3,
          bgcolor: "#FF8100",
          "&:hover": {
            bgcolor: "#e6891d",
          },
          fontSize: "20px",
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
