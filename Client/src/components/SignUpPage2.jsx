import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
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
import { Select, InputLabel, MenuItem, FormControl } from "@mui/material";

function SignUpPageTwo({ setFormData }) {
  const [errorText, setErrorText] = useState("");
  const [TooltipOne, setTooltipOne] = useState(false);
  const [TooltipTwo, setTooltipTwo] = useState(false);
  const [gender, setGender] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    // The 'date' parameter represents the selected date from the DatePicker
    if (date) setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleGenderChange = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);

    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleFocusChange = (e) => {
    const isValidEmail = /\S+@\S+\.\S+/.test(e.target.value);

    if (e.target.value !== "" && isValidEmail === false) {
      console.log(isValidEmail);
      setErrorText("Please enter a valid Email Address");
      handleTooltipOneOpen();
    } else {
      setErrorText("");
      handleTooltipOneClose();
    }
  };

  return (
    <>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipOneClose}
        open={true}
        disableHoverListener
        disableTouchListener
        arrow
        title={errorText}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          id="email"
          onChange={handleInputChange}
          onBlur={handleFocusChange}
          autoFocus
        />
      </Tooltip>

      <DatePicker
        sx={{ width: "100%" }}
        name="birthday"
        id="birthday"
        margin="normal"
        label="Birthday"
        onChange={handleDateChange}
      />
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
        {/* <TextField
          margin="normal"
          required
          fullWidth
          name="gender"
          label="Gender"
          id="gender"
          onChange={handleInputChange}
          onFocus={handleTooltipOneClose}
        /> */}
    <Box sx={{ minWidth: 120, mt:1,}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
          name="gender"
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Tooltip>
    </>
  );
}

export default SignUpPageTwo;
