/* eslint-disable react/prop-types */
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { deleteDevice } from "../../../api/services/devices";

const AccordionSummaryRow = ({ children }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {children}
  </div>
);
const AccordionSummaryCol = (props) => (
  <div
    style={{
      width: "48%",
      minWidth: "165px",
      display: "flex",
      justifyContent: "flex-start",
      ...props.style,
    }}
  >
    {props.children}
  </div>
);

const DeviceUnit = ({ device, onDelete }) => {
  const deleteHandler = ()=>{
    deleteDevice(device.uid).then(()=>{onDelete()})
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Divider sx={{mt:1,mb:1}}/>
      <AccordionSummaryRow>
        <AccordionSummaryCol style={{ paddingRight: "10px" }}>
          <Typography>Uid:{device.uid}</Typography>
        </AccordionSummaryCol>
        <AccordionSummaryCol style={{ paddingRight: "35px" }}>
          <Typography>Vendor: {device.vendor}</Typography>
        </AccordionSummaryCol>
      </AccordionSummaryRow>

      <AccordionSummaryRow>
        <AccordionSummaryCol style={{ paddingRight: "10px" }}>
          <Typography >Creation date: <span style={{whiteSpace: "nowrap"}}>{device.dateCreated}</span></Typography>
        </AccordionSummaryCol>
        <AccordionSummaryCol style={{ paddingRight: "35px" }}>
          <div style={{ width: "80%", display: "flex" }}>
            <Typography>Status:&nbsp;</Typography>
            {device.status === "online" ? (
              <Tooltip title="online">
                {/* <Typography style={{ display: "flex", alignItems: "center" }}> */}
                  <CircleIcon htmlColor="#02d31e" />
                {/* </Typography> */}
              </Tooltip>
            ) : (
              <Tooltip title="offline">
                {/* <Typography style={{ display: "flex", alignItems: "center" }}> */}
                  <RadioButtonCheckedIcon htmlColor="#585757" />
                {/* </Typography> */}
              </Tooltip>
            )}
          </div>
          <div style={{ width: "20%", display: "flex" }}>
            <Tooltip title="Delete device">
            <IconButton
              aria-label="delete"
              style={{ position: "absolute", top: "15px", right: 1 }}
              onClick={deleteHandler}
            >
              <DeleteIcon />
            </IconButton>
            </Tooltip>
          </div>
        </AccordionSummaryCol>
      </AccordionSummaryRow>
    </div>
  );
};

export default DeviceUnit;
