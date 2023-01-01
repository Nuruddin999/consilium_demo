import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, TextField, Typography, Button, CircularProgress } from "@mui/material";
import './style.applicationitem.scss'
import { RootState } from "../../app/store";
import { getListItemAction } from "../../common/actions/common";
import { Right, savePhone, saveUserItem, saveUserItemSpeciality } from "../../reducers/userSlice";
import { entitiesForRights } from "../../constants";
import { updatePrimaryData, updateRightsAction, userSignFileUpdate } from "../../actions/user";
import { selectApplicationUserRights, selectsUserItemRights } from "../../common/selectors/user";
import { FileUpload } from "../../common/components/fileupload/fileUpload";
import { isEmpty } from "lodash";
import { setError, setFileUploadStatus } from "../../reducers/ui";
import CloseIcon from '@mui/icons-material/Close';
import { CommonButton } from "../../common/components/button";
import Specialities from "../../common/components/specialities/specialities";

type userItem = {
  isProfile?: boolean,
  id?: string,
  onClose: Dispatch<SetStateAction<string>>
}

const UserItemScreen = ({ isProfile, id, onClose }: userItem): React.ReactElement => {
  const { fileUploadStatus, userItemStatus, errorMessage } = useSelector((state: RootState) => state.ui)
  const { name, email, speciality, phone, role, urlSignPath, signFileName } = useSelector((state: RootState) => state.user.useritem)
  const { id: userApplId } = useSelector((state: RootState) => state.user.user)
  const idUrl = id ? id : isProfile ? userApplId : ''
  const rights: Right[] = useSelector((state: RootState) => selectsUserItemRights(state))
  const applUserRights = useSelector((state: RootState) => selectApplicationUserRights(state))
  const { users } = applUserRights.processedRights
  const [files, setFiles] = useState<Array<File>>([])
  const dispatch = useDispatch()
  const handleChange = (entity: string, field: string, value: any) => {
    dispatch(updateRightsAction(entity, field, value, idUrl))
  }
  const updateFile = () => {
    dispatch(userSignFileUpdate(idUrl, files))
  }

  useEffect(() => {
    if (idUrl) {
      dispatch(getListItemAction(idUrl, 'users', saveUserItem))
    }
  }, [idUrl])
  useEffect(() => {
    if (fileUploadStatus === 'success' || 'error') {
      setFiles([])
      setTimeout(() => dispatch(setFileUploadStatus('no')), 1500)
    }
  }, [fileUploadStatus])
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => dispatch(setError('')), 1500)
    }
  }, [errorMessage])

  return userItemStatus === 'pending' ? <div className="user-item-loader"><CircularProgress /></div> : <div className="user-item-wrapper">
    <div className='close-ic' onClick={() => onClose('')}>
      <CloseIcon />
    </div>
    {userItemStatus === 'ok' ? <div className="user-item">
      <div className='user-info-block'>
        <div className="user-info">
          <Typography fontWeight='bold'>
            Имя
          </Typography>
          <Typography children={name} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography fontWeight='bold'>
            Роль
          </Typography>
          <Typography children={role} className='user-info-name' />
        </div>
        {users?.update ? <Specialities speciality={speciality} setSpeciality={(e)=>dispatch(saveUserItemSpeciality(e))} /> : <div className="user-info"> <Typography fontWeight='bold'>
          Специальность
        </Typography>
          <Typography children={speciality} className='user-info-name' />
        </div>}
        <div className="user-info">
          <Typography fontWeight='bold'>
            Телефон
          </Typography>
          <TextField size='small' disabled={!users?.update} value={phone} className='user-info-name' onChange={(e) => dispatch(savePhone(e.target.value))} />
        </div>
        <div className="user-info">
          <Typography fontWeight='bold'>
            email
          </Typography>
          <Typography children={email} className='user-info-name' />
        </div>
      </div>
      <Typography margin={2} variant='h6'>Фото подписи</Typography>
      {urlSignPath && <div className='sign-img'>
        <img src={urlSignPath} width='200px' height='100px' />
        <Typography>{signFileName}</Typography>
      </div>}
      {users?.update && <div className={'upload-section'}>
        <FileUpload files={files} setFiles={setFiles} />
        <Button onClick={updateFile} disabled={isEmpty(files)}>Загрузить</Button>
        {fileUploadStatus === 'pending' && <CircularProgress size={20} />}
        {fileUploadStatus === 'error' && <Typography>{errorMessage}</Typography>}
      </div>}
      <Typography variant='h6' gutterBottom className='rights-title'>
        Права
      </Typography>
      <div className='rights-section'>
        <Typography>
        </Typography>
        <Typography>
          Создание
        </Typography>
        <Typography>
          Просмотр
        </Typography>
        <Typography>
          Правка
        </Typography>
        <Typography>
          Удаление
        </Typography>
        {rights?.map((right) => <React.Fragment  key={right.entity}>
          <Typography align='left'>
            {entitiesForRights[right.entity as keyof typeof entitiesForRights]}
          </Typography>
          <Checkbox checked={right.create} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'create', e.target.checked)} />
          <Checkbox checked={right.read} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'read', e.target.checked)} />
          <Checkbox checked={right.update} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'update', e.target.checked)} />
          <Checkbox checked={right.delete} disabled={isProfile || !users?.update} onChange={(e) => handleChange(right.entity, 'delete', e.target.checked)} />
        </React.Fragment >)}
        {errorMessage && <Typography color='secondary'>
          {errorMessage}
        </Typography>}
      </div>
      <div className='save-button'>
        <CommonButton title='Сохранить' onClick={() => dispatch(updatePrimaryData(email,speciality,phone))} />
      </div>

    </div> : <div className="user-item-loader"><Typography>{errorMessage}</Typography></div>}

  </div>
}
export default UserItemScreen