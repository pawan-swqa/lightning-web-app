import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Checkbox,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ThunderLogo from "@mui/icons-material/Thunderstorm";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
function TopNavBar(props) {
  const fromDateConverted = new Date(props.filters.fromDate);
  const toDateConverted = new Date(props.filters.todate);
  const [startDate, setStartDate] = useState(fromDateConverted);
  const [endDate, setEndDate] = useState(toDateConverted);
  const [intensityFrom, setIntensityFrom] = useState(
    props.filters.intensityFrom
  );
  const [intensityTo, setIntensityTo] = useState(props.filters.intensityTo);
  const [isCloudToCloud, setCloudToCloud] = useState(
    props.filters.isCloudToCloud
  );
  useEffect(() => {});
  function sendProps(data) {
    props.refreshData(data);
  }
  return (
    <AppBar position="static" color="">
      <Toolbar>
        <IconButton size="large" edge="start" color="primary" aria-label="logo">
          <ThunderLogo />
        </IconButton>
        <Typography variant="h6" component="div">
          Lightning app
        </Typography>
        <Box zIndex={1001} sx={{ width: 200, height: 50, paddingLeft: 4 }}>
          <Typography sx={{ fontSize: 13, color: "#808080" }}>From</Typography>
          <DatePicker
            startIcon={<CalendarMonthIcon />}
            className="datePicker"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
        </Box>
        <Box zIndex={1001} sx={{ width: 200, height: 50, paddingLeft: 2 }}>
          <Typography sx={{ fontSize: 13, color: "#808080" }}>To</Typography>
          <DatePicker
            startIcon={<CalendarMonthIcon />}
            className="datePicker"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
        </Box>
        <TextField
          onChange={(e) => {
            setIntensityFrom(e.target.value);
          }}
          id="standard-basic"
          label="Intensity From"
          type="number"
          variant="standard"
          value={intensityFrom}
          sx={{ paddingRight: 4, color: "black" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={(e) => {
            setIntensityTo(e.target.value);
          }}
          id="standard-basic"
          label="Intensity to"
          type="number"
          variant="standard"
          value={intensityTo}
          sx={{ paddingRight: 4 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography>Cloud to Cloud</Typography>
        <Checkbox
          onChange={(e) => {
            setCloudToCloud(e.target.checked);
          }}
          defaultChecked
          color="primary"
        />
        <Button
          startIcon={<FilterAltIcon />}
          variant="outlined"
          sx={{ marginLeft: 4, float: "right" }}
          onClick={() => {
            const newFilters = {
              fromDate: startDate,
              todate: endDate,
              intensityFrom: intensityFrom,
              intensityTo: intensityTo,
              isCloudToCloud: isCloudToCloud,
            };
            sendProps(newFilters);
          }}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          sx={{ marginLeft: 4, float: "right" }}
          onClick={() => {
            const filters = {
              fromDate: "2010-06-09T15:44:04Z",
              todate: "2022-06-10T12:44:04Z",
              intensityFrom: "4",
              intensityTo: "12",
              isCloudToCloud: true,
            };
            sendProps(filters);
          }}
        >
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
