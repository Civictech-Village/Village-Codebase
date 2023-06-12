import { useContext, useState } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SignUpPageTwo from "../components/SignUpPage2";
// Controlling the signup form is a good idea because we want to adde (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [TooltipOne, setTooltipOne] = useState(false);
  const [TooltipTwo, setTooltipTwo] = useState(false);
  const [NameClass, setNameClass] = useState("");
  const [PasswordClass, setPasswordClass] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [allFormData, setFormData] = useState({});


  const handleNext = (e) => {
    console.log(e.target.value)
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = (e) => {
    console.log(e.target.value)

    setCurrentStep(currentStep - 1);
  };

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfrimChange = (e) => {
    setconfirmPassword(e.target.value);
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
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const postObject = Object.fromEntries(formData.entries());
    const totalObject = {...postObject, ...allFormData}
    console.log(totalObject.date["$d"]);
    if (postObject.username.length < 1) {
      setErrorText("Please enter a username");
      setNameClass("animate__animated animate__headShake");

      setTimeout(() => setNameClass(""), 500);
      return handleTooltipTwoOpen();
    }
    if (postObject.password.length < 1) {
      setErrorText("Please enter a password");
      setPasswordClass("animate__animated animate__headShake");
      setTimeout(() => setPasswordClass(""), 500);

      return handleTooltipOneOpen();
    }
    const [user, error] = await createUser(totalObject, totalObject.date["$d"]);
    if (error) {
      handleTooltipOneOpen();
      return setErrorText(error.statusText);
    }
    console.log(user);
    setCurrentUser(user);
    navigate("/");
  };
  const renderStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <>
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
                onChange={handlePasswordChange}
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
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                className={PasswordClass}
                onFocus={handleTooltipOneClose}
                onChange={handleConfrimChange}
              />
            </Tooltip>

            {/* {!!errorText && <p>{errorText}</p>} */}
          </>
        );
      case 1:
        return <SignUpPageTwo setFormData ={setFormData}></SignUpPageTwo>;
      default:
        return null;
    }
  };

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
              Sign up
            </Typography>
            <>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "90%" }}
              >
                {renderStep()}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {currentStep < 2 ? (
                    <Button
                      fullWidth
                      onClick={handleNext}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      variant="contained"
                      color="error"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Previous
                    </Button>
                  )}
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={(password!=='' && password == confirmPassword) ? false : true}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link component={RouterLink} to="/login" variant="body2">
                      {"Already have an account with us? Log in!"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
