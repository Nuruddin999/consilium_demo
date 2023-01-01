import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeDiagnostic, saveDiagnostic, deleteDiagnostic } from "../../../reducers/applicationItemSlice";
import './style.diagnostic.scss'
import NoResult from "../../no-result/no-result";
import { selectApplicationUserRights } from "../../../common/selectors/user";

const DiagnosticForm = (): React.ReactElement => {
   const dispatch = useDispatch()
   const diagnosticProp = useSelector((state: RootState) => state.applicationItem.diagnostic)
   const { processedRights } = useSelector((state: RootState) => selectApplicationUserRights(state))
   const { applications } = processedRights
   const [diagnosis, setDiagnosis] = useState('')
   const addDiagnosis = () => {
      dispatch(saveDiagnostic(diagnosis))
   }
   const removeDiagnostic = (index: number) => {
      dispatch(deleteDiagnostic(index))
   }
   return <div>
      <h3>С целью проведения дифференциальной диагностики между</h3>
      <h5>(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)</h5>
   { diagnosticProp.length > 0 ? <table>
         <thead>
         <tr>
            <th>
               <span>
                  №
               </span>
            </th>
            <th>
               <span>
                  Диагноз
               </span>
            </th>
            <th>
            </th>
         </tr>
         </thead>
         <tbody>
            {diagnosticProp.length > 0 && diagnosticProp.map((diagnos, index) => <tr>
               <td>{index + 1}</td>
               <td>    <TextField
                  value={diagnos.diagnosis}
                  variant='standard'
                  size='small'
                  fullWidth
                  placeholder='диагноз'
                  onChange={(e) => applications?.update && dispatch(changeDiagnostic({ index, diagnosis: e.target.value }))}
               /></td>
               <td><IconButton disabled={!applications?.update} className='delete-button' onClick={() => removeDiagnostic(index)}>
                  <DeleteOutlineIcon />
               </IconButton></td>
            </tr>)}
         </tbody>
      </table> : <NoResult />}
      <Typography>Добавить диагноз в табилцу</Typography>
      <div className='add-in-table-section'>
      <TextField
         value={diagnosis}
         variant='outlined'
         size='small'
         fullWidth
         placeholder='Диагноз'
         onChange={(e) => setDiagnosis(e.target.value)}
      />
      <IconButton  disabled={!applications?.update} onClick={addDiagnosis} >
         <AddCircleIcon  className='add-in-table-svg ' />
      </IconButton>
      </div>
   </div>
}
export default DiagnosticForm