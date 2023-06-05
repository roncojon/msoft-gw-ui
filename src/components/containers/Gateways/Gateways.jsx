import { useState } from "react";
import useGateways from "../../../hooks/useGateways";
import CustomButton from "../../common/CustomButton";

import { GatewaysList } from "./GatewaysList";
import { Divider, Paper } from "@mui/material";
import NewGatewayForm from "./NewGatewayForm";

const GatewaysContainer = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { isLoading, error, data, isFetching, createGateway, refetch } =
    useGateways(true);

  const closeDialogHandler = () => {
    setOpenDialog(false);
  };

  const handleCreateGateway = (gatewayPostData) => {
    setOpenDialog(true);
    createGateway(gatewayPostData); // Call the createGateway function to make the POST request
    closeDialogHandler();
  };
  return (
    <div className="card">
        <CustomButton
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
          }}
          sx={{ mt: 1, mb: 1 }}
        >
          Create Gateway
        </CustomButton>
        <NewGatewayForm
          open={openDialog}
          onComplete={handleCreateGateway}
          onClose={closeDialogHandler}
        />
        {/* <CustomButton onClick={handleGetSingleGateway}>
          Get Single Gateway Data
        </CustomButton> */}
        {data && (
          <>
            <Divider />
            <GatewaysList gatewaysList={data} refetch={refetch} />
          </>
        )}
    </div>
  );
};

export default GatewaysContainer;
