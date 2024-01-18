import {
  Button,
  TextField,
  Typography,
  Box,
  AlertColor,
  Alert,
} from "@mui/material";
import AppBar from "../components/AppBar";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import routes from "./routes";
import { useState } from "react";

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>();
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({
    show: false,
    message: "",
    severity: undefined,
  });

  const onSubmitSignup = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("http://localhost/api/user/", data);
      console.log("Signup Success:", response.data);
      setAlert({
        show: true,
        message: "Signup successful!",
        severity: "success",
      });
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Signup Error:", error);
      setAlert({
        show: true,
        message: `Signup failed.: ${error}`,
        severity: "error",
      });
    }
  };

  return (
    <>
      <AppBar
        title="React App"
        actions={
          <Button
            color="primary"
            size="small"
            component={Link}
            to={routes.signin}
            variant="contained"
          >
            Sign In
          </Button>
        }
      />
      <Wrapper>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Sign Up
          </Typography>

          {alert.show && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmitSignup)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              autoComplete="fname"
              autoFocus
              {...register("first_name", { required: true })}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              autoComplete="lname"
              {...register("last_name", { required: true })}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Wrapper>
    </>
  );
}

export default App;
