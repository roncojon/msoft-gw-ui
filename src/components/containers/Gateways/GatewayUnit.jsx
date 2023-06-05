/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import CircleIcon from "@mui/icons-material/Circle";

import { getOneGateway } from "../../../api/services/gateways";
import { useQuery } from "@tanstack/react-query";
import { DevicesContainer } from "../Devices/DevicesContainer";

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
const GatewayUnit = ({ gw ,refetchReq}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /* const reqSingleGateway = async () => {
    await getOneGateway(gw.serialNumber);
  }; */

  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: ["oneGateway",gw.serialNumber],
    queryFn: () => getOneGateway(gw.serialNumber),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleChange = () => {
    if (!data) refetch();
    setIsExpanded(!isExpanded);
  };

  console.log("single gateway data");
  console.log(data);

  const refetchDevicesHandler = () =>{
    // console.log('deleteddd')

    refetchReq();
    refetch();
  }

  return (
    <Accordion expanded={isExpanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={gw.serialNumber + "content"}
        id={gw.serialNumber + "header"}
      >
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <AccordionSummaryRow>
            <AccordionSummaryCol>
              <Typography>Name:{gw.name}</Typography>
            </AccordionSummaryCol>
            <AccordionSummaryCol style={{ paddingRight: "10px" }}>
              <Typography>SN: {gw.serialNumber}</Typography>
            </AccordionSummaryCol>
          </AccordionSummaryRow>

          <AccordionSummaryRow>
            <AccordionSummaryCol>
              <Typography>IP: {gw.ipv4address}</Typography>
            </AccordionSummaryCol>
            <AccordionSummaryCol style={{ paddingRight: "10px" }}>
              <div style={{ width: "100%", display: "flex" }}>
                <Typography>Devices:&nbsp;</Typography>
                <Tooltip title="online">
                <Typography
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <CircleIcon htmlColor="#02d31e" />: {gw.onlineDevices}
                </Typography>
                </Tooltip>
                &nbsp;|&nbsp;
                <Tooltip title="offline">
                <Typography
                 style={{ display: "flex", alignItems: "center" }}>
                  <RadioButtonCheckedIcon htmlColor="#585757" />:{" "}
                  {gw.offlineDevices}
                </Typography>
                </Tooltip>
              </div>
            </AccordionSummaryCol>
          </AccordionSummaryRow>
        </div>
      </AccordionSummary>
      {data && !isLoading &&
      <AccordionDetails>
        <DevicesContainer devices={data.gateway.devices} onDelete={refetchDevicesHandler} gwSerialNumber={gw.serialNumber} onNewDevice={refetchDevicesHandler}/>
      </AccordionDetails>
      }
    </Accordion>
  );
};

export default GatewayUnit;
