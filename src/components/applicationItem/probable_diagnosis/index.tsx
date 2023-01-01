import React  from "react";
import {  useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.probdiagnosis.scss'
import { changeMostProblDiagnosis, changeSecondaryDiagnosis } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";

const MostProbDiagnosis = (): React.ReactElement => {
  const mostProblDiagnosis = useSelector((state: RootState) => state.applicationItem.mostProblDiagnosis)
  const secondaryDiagnosis = useSelector((state: RootState) => state.applicationItem.secondaryDiagnosis)
  const { applications } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights

  const dispatch = useDispatch()
  return <>
    <div className="most-probbl-diagnosis">
      <h4>Выявлен наиболее вероятный
        основной диагноз:  </h4>
      <TextField
        fullWidth
        placeholder='Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
        тяжелой степени, перелома костей свода черепа,
        аксонального повреждения ГМ в виде травматической
        болезни ГМ, спастической гемиплегии. Посттравматическая
        энцефалопатия.'
        className="text"
        size='small'
        multiline
        maxRows={6}
        value={mostProblDiagnosis}
        onChange={(e) => applications?.update && dispatch(changeMostProblDiagnosis(e.target.value))}
      />
    </div>
    <div className="most-probbl-diagnosis">
      <h4>Выявлены сопутствующие
        диагнозы: </h4>
      <TextField
        fullWidth
        placeholder='Хронический тонзиллит'
        className="text"
        size='small'
        multiline
        maxRows={4}
        value={secondaryDiagnosis}
        onChange={(e) => applications?.update && dispatch(changeSecondaryDiagnosis(e.target.value))}
      />
    </div>
  </>
}
export default MostProbDiagnosis