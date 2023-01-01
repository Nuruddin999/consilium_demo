import { Typography} from "@mui/material";
import React from "react";
import './style.noresult.scss'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';


const NoResult = (): React.ReactElement => {

    return <div className='no-result'>
        <DoNotDisturbAltIcon fontSize='large'/>
        <div>
            <Typography>
                Нет данных, добавьте данные в табилцу
            </Typography>
        </div>
    </div>

}
export default NoResult