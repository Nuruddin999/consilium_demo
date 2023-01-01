import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeCheckupPlan, saveCheckupPlan, deleteCheckupPlan } from "../../../reducers/applicationItemSlice";
import './style.checkupplans.scss'
import NoResult from "../../no-result/no-result";
import CloseIcon from '@mui/icons-material/Close';
import { selectApplicationUserRights } from "../../../common/selectors/user";
import { changeDeleteOptionAction } from "../../../actions/application";


const CheckupPlanForm = (): React.ReactElement => {
  const dispatch = useDispatch()
  const {checkupPlans, id, checkUpPlaceIsDeleted } = useSelector((state: RootState) => state.applicationItem)
  const {  isDeletedPlace } = useSelector((state: RootState) => state.user.user)
  const { applications, checkupPlanPlace } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const [kind, setKind] = useState('')
  const [place, setPlace] = useState('')
  const [target, setTarget] = useState('')
  const bc = useMemo(() => new BroadcastChannel('pdf_channel'), []);
  const addConsliliumDoctor = () => {
    dispatch(saveCheckupPlan({ kind, place, target }))
    setKind('')
    setPlace('')
    setTarget('')
  }
  const deletePlan = (index: number) => {
    dispatch(deleteCheckupPlan(index))
  }
  const sendBroadcastMessage = () => {
    dispatch(changeDeleteOptionAction(id.toString()))
    bc.postMessage(checkUpPlaceIsDeleted);
  }
  useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
  return <div>
    {checkupPlans.length > 0 ? <table>
      <tr>
        <th>
          <span>
            №
          </span>
        </th>
        <th>
          <span>
            Вид обследования
          </span>
        </th>
        {!checkUpPlaceIsDeleted && <th>
          <span>
            Место
          </span>
        </th>}
        <th>Цель проведения обследования</th>
        <th>
        </th>
      </tr>
      <tbody>
        {checkupPlans.length > 0 && checkupPlans.map((checkupPlan, index) => <tr>
          <td>{index + 1}</td>
          <td>    <TextField
            value={checkupPlan.kind}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Вид обследования'
            onChange={(e) => applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: e.target.value, place: checkupPlan.place, target: checkupPlan.target } }))}
          /></td>
          {!checkUpPlaceIsDeleted && <td>
            <TextField
              value={checkupPlan.place}
              variant='standard'
              size='small'
              fullWidth
              placeholder='Место'
              onChange={(e) =>  applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: e.target.value, target: checkupPlan.target } }))}
            />
          </td>}
          <td>    <TextField
            value={checkupPlan.target}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Цель проведения обследования'
            onChange={(e) => applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: checkupPlan.place, target: e.target.value } }))}
          /></td>
          <td><IconButton disabled={!applications?.update} className='delete-button' onClick={() => deletePlan(index)}>
            <DeleteOutlineIcon />
          </IconButton></td>
        </tr>)}
      </tbody>
    </table> : <NoResult />}
    <Typography>Добавить план обследования в таблицу</Typography>
    <div className="add-in-table-section">
      <TextField
        value={kind}
        variant='outlined'
        size='small'
        fullWidth
        placeholder='Вид обследования'
        onChange={(e) => setKind(e.target.value)}
      />
      <div className='place'>
        {checkupPlanPlace?.delete  &&
          <div>
            {!checkUpPlaceIsDeleted && <IconButton size='small' className='hide-place' onClick={sendBroadcastMessage}>
              <CloseIcon />
            </IconButton>}
          </div>
        }
        {!checkUpPlaceIsDeleted ? <TextField
          value={place}
          variant='outlined'
          size='small'
          fullWidth
          placeholder='Место'
          onChange={(e) => setPlace(e.target.value)}
        /> : <Button disabled={!checkupPlanPlace?.delete} onClick={sendBroadcastMessage}>показать</Button>}
      </div>
      <TextField
        value={target}
        variant='outlined'
        size='small'
        fullWidth
        maxRows={5}
        multiline
        placeholder='Цель проведения обследования'
        onChange={(e) => setTarget(e.target.value)}
      /> <IconButton disabled={!applications?.update} onClick={addConsliliumDoctor} >
        <AddCircleIcon className='add-in-table-svg ' />
      </IconButton>
    </div>

  </div>
}
export default CheckupPlanForm