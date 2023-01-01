import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, TextField, Typography, Button, CircularProgress } from "@mui/material";
import './style.applicationitem.scss'
import { RootState } from "../../app/store";
import { getListItemAction } from "../../common/actions/common";
import { Right, saveEmail, savePhone, saveUserItem } from "../../reducers/userSlice";
import { entitiesForRights } from "../../constants";
import { updateRightsAction, userSignFileUpdate } from "../../actions/user";
import { selectApplicationUserRights, selectsUserItemRights } from "../../common/selectors/user";
import { FileUpload } from "../../common/components/fileupload/fileUpload";
import { isEmpty } from "lodash";
import { setError, setFileUploadStatus } from "../../reducers/ui";
type userItem = {
  isProfile?: boolean
}
const UserItem = ({ isProfile }: userItem): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const {fileUploadStatus, status, errorMessage} = useSelector((state: RootState) => state.ui)
  const { name, email, speciality, phone, role, urlSignPath, signFileName } = useSelector((state: RootState) => state.user.useritem)
  const { id: userApplId } = useSelector((state: RootState) => state.user.user)
  const idUrl = id ? id : userApplId
  const rights: Right[] = useSelector((state: RootState) => selectsUserItemRights(state))
  const applUserRights = useSelector((state: RootState) => selectApplicationUserRights(state))
  const { users } = applUserRights.processedRights
  const [files, setFiles] = useState<Array<File>>([])
  const dispatch = useDispatch()
  const handleChange = (entity: string, field: string, value: any) => {
    dispatch(updateRightsAction(entity, field, value, id))
  }
  const updateFile = () => {
    dispatch(userSignFileUpdate(idUrl, files))
  }
  useEffect(() => {
    dispatch(getListItemAction(idUrl, 'users', saveUserItem))
  }, [])
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

  return  status === 'pending' ? <div className="user-item-loader"><CircularProgress /></div> : <div  className="user-item-wrapper">
{ status === 'ok' ? <div className="user-item">
    <div className='user-info-block'>
      <div className="user-info">
        <Typography>
          Имя
        </Typography>
        <Typography children={name} className='user-info-name' />
      </div>
      <div className="user-info">
        <Typography>
          Роль
        </Typography>
        <Typography children={role} className='user-info-name' />
      </div>
      <div className="user-info">
        <Typography>
          Специальность
        </Typography>
        <Typography children={speciality} className='user-info-name' />
      </div>
      <div className="user-info">
        <Typography>
          Телефон
        </Typography>
        <TextField size='small' disabled={!users?.update} value={phone} className='user-info-name' onChange={(e) => dispatch(savePhone(e.target.value))} />
      </div>
      <div className="user-info">
        <Typography>
          email
        </Typography>
        <TextField size='small' disabled={!users?.update} value={email} className='user-info-name' onChange={(e) => dispatch(saveEmail(e.target.value))} />
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
      {fileUploadStatus === 'error' &&  <Typography>{errorMessage}</Typography>}
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
      {rights?.map((right) => <>
        <Typography align='left'>
          {entitiesForRights[right.entity as keyof typeof entitiesForRights]}
        </Typography>
        <Checkbox checked={right.create} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'create', e.target.checked)} />
        <Checkbox checked={right.read} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'read', e.target.checked)} />
        <Checkbox checked={right.update} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'update', e.target.checked)} />
        <Checkbox checked={right.delete} disabled={isProfile || !users?.update} onChange={(e) => handleChange(right.entity, 'delete', e.target.checked)} />
      </>)}
      {errorMessage &&  <Typography color='secondary'>
        {errorMessage}
      </Typography> }
    </div>
  </div> : <div className="user-item-loader"><Typography>{errorMessage}</Typography></div> }

  </div>
}
export default UserItem