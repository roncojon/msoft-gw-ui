/* eslint-disable react/prop-types */
import { Button, Divider, Typography } from "@mui/material";
import DeviceUnit from "./DeviceUnit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import NewDeviceForm from "./NewDeviceForm";

export const DevicesContainer = ({
  devices,
  onDelete,
  gwSerialNumber,
  onNewDevice,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Typography style={{ width: "100%" }}>Devices info:</Typography>
      {devices.map((device) => {
        console.log("devices from DevicesContainer");
        console.log(devices);
        return (
          <DeviceUnit key={device.uid} device={device} onDelete={onDelete} />
        );
      })}
      <Divider sx={{ mt: 1, mb: 1 }} />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add device
        </Button>
        <NewDeviceForm
          open={openDialog}
          gwSerialNumber={gwSerialNumber}
          onComplete={onNewDevice}
          onClose={() => {
            setOpenDialog(false);
          }}
        />
      </div>
    </div>
  );
};
