import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Typography } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.anamnesis.scss'
import { changeComplaints, changeAnamnesis, changeDiagnosticData } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";


const Anamnesis = (): React.ReactElement => {

  const complaints = useSelector((state: RootState) => state.applicationItem.complaint)
  const anamnesis = useSelector((state: RootState) => state.applicationItem.anamnesis)
  const diagnosticData = useSelector((state: RootState) => state.applicationItem.diagnosticData)
  const { applications } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const dispatch = useDispatch()
  return <div className="anamnesis">
    <div className='complaints'>
      <Typography fontWeight={700}>Жалоб:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder='Ограничение движений преимущественно в правых конечностях, снижение памяти,
        нарушение статики и ходьбы.'
        variant='standard'
        value={complaints}
        className='text-section'
        onChange={(e) => applications?.update && dispatch(changeComplaints(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>Анамнеза:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder='В августе 2012 года получил огнестрельное ранение в голову, сразу после травмы
        был госпитализирован в Кизилюртовскую ГБ, там получал медикаментозное и оперативное
        лечение (трепанация черепа); с тех пор является инвалидом, получает периодическое
        амбулаторное лечение, стационарное лечения, реабилитационное лечение со слабым и
        непродолжительным положительным эффектом, отмечается постепенное прогрессирование
        симптоматики, является инвалидом 1й группы.'
        variant='standard'
        className='text-section'
        value={anamnesis}
        onChange={(e) => applications?.update &&  dispatch(changeAnamnesis(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>Данных обследования:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder='предоставлен ВЭ от 2012 года сразу после аварии и от 2021г из
        реабилитационного центра, где описан DS подопечного, его объективное состояние.'
        variant='standard'
        className='text-section'
        value={diagnosticData}
        onChange={(e) => applications?.update &&  dispatch(changeDiagnosticData(e.target.value))} />
    </div>
  </div>
}
export default Anamnesis