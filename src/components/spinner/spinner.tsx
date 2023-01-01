import { CircularProgress } from "@mui/material";
import React from "react";

import './style.spiner.scss'

export const Spinner = (): React.ReactElement => {

 return <div className='spinner-wrapper'>
     <div className="progress">
         <CircularProgress />
     </div>
  </div>
}
export default Spinner