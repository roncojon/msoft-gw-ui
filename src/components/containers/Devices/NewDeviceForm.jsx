/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Button,
  Dialog,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { postDevice } from "../../../api/services/devices";
import { useEffect } from "react";
import dayjs from "dayjs";
import { AppContext } from '../../../context';

const NewDeviceForm = ({ open, gwSerialNumber, onComplete, onClose}) => {
  const {setError} = React.useContext(AppContext)

  // VENDOR
  const [deviceVendor, setDeviceVendor] = useState("");
  const handleDeviceVendorChange = (event) => {
    setDeviceVendor(event.target.value);
  };
  // DATE
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    try {
        const formattedDate = dayjs(date).format("MM/DD/YYYY");
  setSelectedDate(formattedDate);
    } catch (error) {
        console.log(error)
    }
    
  };
  // STATUS
  const [status, setStatus] = useState("online");
  const handlestatusChange = () => {
    if (status === "offline") setStatus("online");
    else setStatus("offline");
  };

//   {vendor:deviceVendor,dateCreated:selectedDate,status:status}
const handleSubmit = async () => {
    const deviceData = {
        gatewaySerialNumber:gwSerialNumber,
      vendor: deviceVendor,
      dateCreated: selectedDate,
      status: status,
    };

    try {
      const responseData = await postDevice(deviceData).then(()=>{
        setDeviceVendor("");
        setSelectedDate(null);
        setDisabledSubmit(true)
        setStatus("online");
        onComplete();onClose()}).catch((error)=>{
      setError(error)})
    //   console.log("Response data from post", responseData);

      // Handle the response data if needed
    } catch (error) {
      console.error("Error occurred during POST request", error);
      // Handle the error if needed
    }
  };

  const [disabledSubmit,setDisabledSubmit] = useState(true);

  useEffect(() => {
    if(deviceVendor && selectedDate && disabledSubmit)
    setDisabledSubmit(false)
  }, [deviceVendor, selectedDate])
  
 const closeHandler = ()=>{
  setDeviceVendor("");
  setSelectedDate(null);
  setStatus("online");
  setDisabledSubmit(true);
  onClose();
 }

  return (
    <Dialog open={open} onClose={closeHandler}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "10px",
          margin: "10px",
        }}
      >
        <Typography variant="h2">{gwSerialNumber}</Typography>
        <Typography variant="h2">New device:</Typography>
        <TextField
          id="outlined-basic"
          label="Device vendor"
          variant="outlined"
          value={deviceVendor}
          onChange={handleDeviceVendorChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date created"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <div
          style={{
            width: "100%",
          }}
        >
          <Typography>
            Status:{" "}
            <FormControlLabel
              control={<Switch defaultChecked onChange={handlestatusChange} />}
              label={status}
            />
          </Typography>
        </div>
        <Button variant="outlined" onClick={handleSubmit} disabled={disabledSubmit}>Complete</Button>
      </div>
    </Dialog>
  );
};

export default NewDeviceForm;
