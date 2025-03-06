import { Typography } from "@mui/material";
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
    <Typography>Loading.....</Typography>
    </div>
    </>
  )
};

export default LoadingScreen;
