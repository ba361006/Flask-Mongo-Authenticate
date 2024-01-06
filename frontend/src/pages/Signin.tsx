import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  AlertColor,
} from "@mui/material";
import AppBar from "../components/AppBar";
import routes from "./routes";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface SignInFormData {
  email: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({
    show: false,
    message: "",
    severity: undefined,
  });

  const onSubmitSignin = async (data: SignInFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login/",
        data
      );
      console.log("Signin Success:", response.data);
      setAlert({
        show: true,
        message: "User successfully authenticated!",
        severity: "success",
      });
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Signin Error:", error);
      setAlert({
        show: true,
        message: "Authentication failed. Please try again.",
        severity: "error",
      });
    }
  };
  return (
    <>
      <AppBar title="Signin" linkBackTo={routes.home} />
      <Wrapper>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Sign In
          </Typography>

          {alert.show && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmitSignin)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email-login"
              label="Email Address"
              autoComplete="email"
              autoFocus
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
              id="password-login"
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
              Sign In
            </Button>
          </form>
        </Box>
      </Wrapper>
    </>
  );
};

export default Signin;
