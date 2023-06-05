/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { postGateway } from "../../../api/services/gateways";

const NewGatewayForm = ({ open, onComplete, onClose }) => {
  // NAME
  const [gatewayName, setGatewayName] = useState("");
  const handleGatewayNameChange = (event) => {
    setGatewayName(event.target.value);
  };
  // IPV4
  const [ipv4, setIpv4] = useState("");
  const handleIpv4Change = (event) => {
    setIpv4(event.target.value);
  };
  const [ipv4Error, setIpv4Error] = useState(false);
  const [ipv4HelperText, setIpv4HelperText] = useState("");

  const isValidIPv4 = (ipv4) => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(ipv4);
  };

  const handleSubmit = async () => {
    if (!isValidIPv4(ipv4)) {
      setIpv4Error(true);
      setIpv4HelperText("Invalid IPv4 address");
      return;
    }

    const gatewayData = {
      name: gatewayName,
      ipv4address: ipv4,
    };

    try {
      // const responseData = await postGateway(gatewayData).then(()=>{
      //   setGatewayName("");
      //   setIpv4("");
      //   setDisabledSubmit(true)
      //   onComplete();onClose()})
      setGatewayName("");
      setIpv4("");
      setDisabledSubmit(true);
      onComplete(gatewayData);
      setIpv4Error(false);
      setIpv4HelperText("");
      onClose();

      //   console.log("Response data from post", responseData);

      // Handle the response data if needed
    } catch (error) {
      console.error("Error occurred during POST request", error);
      // Handle the error if needed
    }
  };

  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    if (gatewayName && ipv4 && disabledSubmit) setDisabledSubmit(false);
  }, [gatewayName, ipv4]);

  const closeHandler = () => {
    setGatewayName("");
    setIpv4("");
    setDisabledSubmit(true);
    setIpv4Error(false);
    setIpv4HelperText("");
    onClose();
  };

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
        <Typography variant="h2">New gateway:</Typography>
        <TextField
          id="outlined-basic"
          label="Gateway name"
          variant="outlined"
          value={gatewayName}
          onChange={handleGatewayNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Ipv4 address"
          variant="outlined"
          value={ipv4}
          onChange={handleIpv4Change}
          error={ipv4Error}
          helperText={ipv4HelperText}
        />

        <Button
          variant="outlined"
          onClick={handleSubmit}
          disabled={disabledSubmit}
        >
          Complete
        </Button>
      </div>
    </Dialog>
  );
};

export default NewGatewayForm;
