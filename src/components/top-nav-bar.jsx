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
} from "@mui/material";
import ThunderLogo from "@mui/icons-material/Thunderstorm";

function TopNavBar(props) {
    const fromDateConverted = new Date(props.filters.fromDate);
    const toDateConverted = new Date(props.filters.todate);
    const [startDate, setStartDate] = useState(fromDateConverted);
    const [endDate, setEndDate] = useState(toDateConverted);
    const [intensityFrom, setIntensityFrom] = useState(props.filters.intensityFrom);
    const [intensityTo, setIntensityTo] = useState(props.filters.intensityTo);
    const [isCloudToCloud, setCloudToCloud] = useState(props.filters.isCloudToCloud);

    useEffect(() => {
    })

  function sendProps(data) {
      props.refreshData(data);
  }

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ThunderLogo />
        </IconButton>
        <Typography variant="h6" component="div">
          Lightning app
        </Typography>
        <Box sx={{ width: 200, height: 50, paddingLeft: 4 }}>
          <Typography>From:</Typography>
          <DatePicker
            selected={fromDateConverted}
            onChange={(date) => {
              setStartDate(date);
            //   const newFilters = {
            //     fromDate: date,
            //     todate: endDate,
            //     intensityFrom: intensityFrom,
            //     intensityTo: intensityTo,
            //     isCloudToCloud: isCloudToCloud,
            //   };
            //   sendProps(newFilters);
            }}
          />
        </Box>
        <Box sx={{ width: 200, height: 50 }}>
          <Typography>To:</Typography>
          <DatePicker
            selected={toDateConverted}
            onChange={(date) => {
              setEndDate(date);
            //   const newFilters = {
            //     fromDate: startDate,
            //     todate: date,
            //     intensityFrom: intensityFrom,
            //     intensityTo: intensityTo,
            //     isCloudToCloud: isCloudToCloud,
            //   };
            //   sendProps(newFilters);
            }}
          />
        </Box>
        <TextField
          onChange={(e) => {
            setIntensityFrom(e.target.value);
            // const newFilters = {
            //   fromDate: startDate,
            //   todate: endDate,
            //   intensityFrom: e.target.value,
            //   intensityTo: intensityTo,
            //   isCloudToCloud: isCloudToCloud,
            // };
            // sendProps(newFilters);
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
            // const newFilters = {
            //   fromDate: startDate,
            //   todate: endDate,
            //   intensityFrom: intensityFrom,
            //   intensityTo: e.target.value,
            //   isCloudToCloud: isCloudToCloud,
            // };
            // sendProps(newFilters);
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
            // const newFilters = {
            //   fromDate: startDate,
            //   todate: endDate,
            //   intensityFrom: intensityFrom,
            //   intensityTo: intensityTo,
            //   isCloudToCloud: e.target.checked,
            // };
            // sendProps(newFilters);
          }}
          defaultChecked
          color="default"
        />

        <button onClick={() => {
            debugger;
            const newFilters = {
                fromDate: startDate,
                todate: endDate,
                intensityFrom: intensityFrom,
                intensityTo: intensityTo,
                isCloudToCloud: isCloudToCloud,
              };
              sendProps(newFilters);
        }}>Filter</button>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
