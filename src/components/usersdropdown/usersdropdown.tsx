/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Pagination } from "@mui/material";
import React from "react";
import './style.reportlist.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useUsers } from "../../common/hooks/useUsers";


type UsersDropDownProps = {
  setManager: (manager: { name: string, id: string }) => void,
  setSpeciality: (speciality: string) => void,
  onClose: (isOpen: boolean) => void
}

const UsersDropDown = ({ setManager, setSpeciality, onClose }: UsersDropDownProps): React.ReactElement => {
  const { users, user } = useSelector((state: RootState) => state.user)
  const count = useSelector((state: RootState) => state.user.count)
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  useUsers(page, '', '', '', '')

  /**
   * Переход на отдельное заключение
   * @param {string} name Id заключения.
   * @param {string} speciality Спепциальность.
   */
  const goToApplItem = (name: string, speciality: string, id: string) => {
    setManager({ name, id });
    setSpeciality(speciality)
    onClose(false)
  }
  return <div className='users-dropdown'>
    <table>
      <tbody>
        {users.length > 0 ? users.map((userItem, index) => <tr onClick={() => goToApplItem(userItem.name, userItem.speciality, userItem.id)}>
          <td>{index + 1}</td>
          <td>{userItem.name}</td>
        </tr>) : <Typography> Недостаточно прав</Typography>}
      </tbody>
    </table>
    <div className="pagination">
      <Pagination
        count={(count / 10) + 1}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        size='large'
        color="primary"
        boundaryCount={10}
      />
    </div>
  </div>
}
export default UsersDropDown