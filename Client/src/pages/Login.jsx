import { useContext, useState } from "react";
import {
  useNavigate,
  Navigate,
  Link as RouterLink,
  BrowserRouter,
} from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [TooltipOne, setTooltipOne] = useState(false);
  const [TooltipTwo, setTooltipTwo] = useState(false);
  const [NameClass, setNameClass] = useState("");
  const [PasswordClass, setPasswordClass] = useState("");



  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleTooltipOneClose = () => {
    setTooltipOne(false);
  };

  const handleTooltipOneOpen = () => {
    setTooltipOne(true);
  };

  
  const handleTooltipTwoClose = () => {
    setTooltipTwo(false);
  };

  const handleTooltipTwoOpen = () => {
    setTooltipTwo(true);
  };

  const handleCopyright = () => {
    console.log("hello");
    return navigate("/");
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" component={RouterLink} to="/">
          Village
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const postObject = Object.fromEntries(formData.entries())
    console.log(postObject);
    if(postObject.username.length < 1) {
      setErrorText("Please enter a username");
      setNameClass("animate__animated animate__headShake")

      setTimeout(() => setNameClass(""), 500)
      return handleTooltipTwoOpen();
    }
    if(postObject.password.length < 1) {
      setErrorText("Please enter a password");
      setPasswordClass("animate__animated animate__headShake")
      setTimeout(() => setPasswordClass(""), 500)

      return handleTooltipOneOpen();
    }
    const [user, error] = await logUserIn(
      postObject
    );
    if (error) {
      handleTooltipOneOpen();
      return setErrorText(error.statusText);
    }
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?person)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "#5DBB63",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "90%" }}
            >
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipTwoClose}
                open={TooltipTwo}
                
                disableHoverListener
                disableTouchListener
                arrow
                title={errorText}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  autoFocus
                  className={NameClass}
                  onFocus={handleTooltipTwoClose}
                />
              </Tooltip>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipOneClose}
                open={TooltipOne}
                
                disableHoverListener
                disableTouchListener
                arrow
                title={errorText}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  className={PasswordClass}
                  onFocus={handleTooltipOneClose}
                />
              </Tooltip>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {/* {!!errorText && <p>{errorText}</p>} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
