import * as React from "react";
import useGateways from "../../../hooks/useGateways";
import CustomButton from "../../common/CustomButton";

import { GatewaysList } from "./GatewaysList";
import { CircularProgress, Divider } from "@mui/material";
import NewGatewayForm from "./NewGatewayForm";
import Errors from "../../common/Errors";
import { AppContext } from "../../../context";

const GatewaysContainer = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { setError } = React.useContext(AppContext);

  const { isLoading, error, data, createGateway, refetch } = useGateways(true);

  const closeDialogHandler = () => {
    setOpenDialog(false);
  };

  const handleCreateGateway = (gatewayPostData) => {
    setOpenDialog(true);
    createGateway(gatewayPostData).catch((error) => {setError(error)}); // Call the createGateway function to make the POST request
    closeDialogHandler();
  };
  return (
    <div className="card">
      {isLoading ? (
        <CircularProgress />
      ) : !error && data ? (
        <>
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
        </>
      ) : (
        <Errors error={error} />
      )}
    </div>
  );
};

export default GatewaysContainer;
