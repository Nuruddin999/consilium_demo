/* eslint-disable react-hooks/exhaustive-deps */
import {  Pagination, TextField, CircularProgress } from "@mui/material";
import React, { useCallback } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../actions/user";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { openModal } from "../../reducers/ui";
import isObject from "lodash/isObject";
import { debounce, isEmpty } from "lodash";
import classNames from "classnames";
import { selectApplicationUserRights } from "../../common/selectors/user";
import { useUsers } from "../../common/hooks/useUsers";
import UserItemScreen from "../useritem/userItemScreen";
import { CommonButton } from "../../common/components/button";
import BlockIcon from '@mui/icons-material/Block';

const UsersList = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { users, user } = useSelector((state: RootState) => state.user)
  const { users: applUserRights } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const { isModalOpened, status } = useSelector((state: RootState) => state.ui)
  const count = useSelector((state: RootState) => state.user.count)
  const [page, setPage] = React.useState(1);
  const [name, setUserName] = React.useState('');
  const [speciality, setUserPosition] = React.useState('');
  const [phone, setUserPhone] = React.useState('');
  const [role, setUserRole] = React.useState('');
  const [email, setUserEmail] = React.useState('');
  const [currentUserId, setCurrentUserId] = React.useState('');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const deleteAppl = (value: string) => {
    dispatch(deleteUser(value));
  };
  const tableData = ['№', { title: 'ФИО', field: name, onChange: setUserName }, { title: 'Роль', field: role, onChange: setUserRole }, { title: 'Должность', field: speciality, onChange: setUserPosition }, { title: 'Email', field: email, onChange: setUserEmail }, { title: 'Контакты', field: phone, onChange: setUserPhone }, 'Удалить']
  const roles = {
    doctor: 'Врач',
    admin: 'Админ',
    superadmin: 'Главный админ',
    coordinator: 'Координатор'
  }
  const changeHandler = (e: any, field: string, callback: (title: string) => void) => {
    if (e.target.value.length > 2) {
      callback(e.target.value)
    }
    else if (field.length > 2 && e.target.value.length === 0) {
      callback('')
    }
  };
  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300)
    , []);

  useUsers(page, email, name, speciality, phone)


  return <div className='add-appl-container'>
    {isModalOpened && <AddModal />}
    <div className='add-button-wrapper'>
      {applUserRights?.create && <CommonButton title='Новый пользователь' onClick={() => dispatch(openModal(true))} />}
    </div>
    <div>
      <div className="appl-table">
        <div>
          <table>
            <thead>
              <tr>
                {tableData.map(el => (<th key={isObject(el) ? el.title : el}>
                  <div>
                    <div>
                      <span>
                        {isObject(el) ? el.title : el}
                      </span>
                    </div>
                    {isObject(el) &&
                      <TextField
                        onChange={(e) => debouncedChangeHandler(e, el.field, el.onChange)}
                        type="text"
                        size="small"
                        placeholder="Поиск"
                      />
                    }
                  </div>
                </th>))}
              </tr>
            </thead>
            <tbody>
              {status === 'ok' && !isEmpty(users.filter(el=>el.id !=='1')) && users.filter(el=>el.id !=='1').map((userItem, index) => user.id !== String(userItem.id) && <tr   key={userItem.name}  onClick={() => setCurrentUserId(userItem.id)}>
                <td>{index + 1}</td>
                <td>{userItem.name}</td>
                <td>{roles[userItem.role as keyof typeof roles]}</td>
                <td>{userItem.speciality}</td>
                <td>{userItem.email}</td>
                <td>{userItem.phone}</td>
                <td><IconButton disabled={!applUserRights?.delete} className='delete-button' onClick={(e: any) => {
                  e.stopPropagation()
                  userItem.id && deleteAppl(userItem.id)
                }}>
                  <DeleteOutlineIcon />
                </IconButton></td>
              </tr>)}
            </tbody>
          </table>
          {status === 'pending' && <div className='userlist-loader'> <CircularProgress /> </div>}
          {status === 'ok' && isEmpty(users.filter(el=>el.id !=='1')) && <div><BlockIcon sx={{fontSize:'40px',marginTop:'20px'}} /> </div>}
          <div className="pagination">
            {count > 10 && <Pagination
              count={(count / 10) + 1}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              size='large'
              color="primary"
              boundaryCount={10}
            />}
          </div>
        </div>
      </div>
    </div>
    <div className={classNames('user-item-block', currentUserId ? 'user-item-block-open' : 'user-item-block-closed')}><UserItemScreen id={currentUserId} onClose={setCurrentUserId} /></div>
  </div>
}
export default UsersList