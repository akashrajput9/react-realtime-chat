import { Typography } from "@mui/material";
import { Spinner } from "phosphor-react";
import React from "react";

const loadingDiv = {
  widht: '200px',
  height: '200px', 
  backgroundColor: 'red',
  borderRadius: '100%',

}
const LoadingScreen = () => {
  return (
    <>
    
    <div sylyle={loadingDiv}>
    {/* <Typography>Loading.....</Typography> */}
      {/* <img src={'loading.gif'} /> */}
      <Spinner as="span" animation="grow" />
    </div>
    </>
  )
};

export default LoadingScreen;
