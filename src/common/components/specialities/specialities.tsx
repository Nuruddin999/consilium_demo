import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { specialities } from "../../../constants";

type SpecialitiesProps = {
speciality: string,
setSpeciality:(name:string)=>void
}
const Specialities = ({speciality, setSpeciality}: SpecialitiesProps): React.ReactElement =>
            <FormControl variant="standard" fullWidth>
               <InputLabel id="demo-simple-select-standard-label">Специальность</InputLabel>
               <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  label="Специальность"
               >
                  {specialities.map(speciality => <MenuItem key={speciality} value={speciality}>{speciality}</MenuItem>)}
               </Select>
            </FormControl>

export default Specialities