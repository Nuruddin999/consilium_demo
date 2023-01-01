import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import './style.reportlist.scss'
import { useDispatch } from "react-redux";
import './style.addmodal.scss'
import { openModal } from "../../reducers/ui";
import { Registration } from "../../common/components/registration/registration";

const AddModal = (): React.ReactElement => {
  const dispatch = useDispatch()
  return <div className='add-modal-container'>
    <div className="add-form-wrapper">
      <div className='close-ic' onClick={() => dispatch(openModal(false))}>
        <CloseIcon />
      </div>
      <Registration />
    </div>
  </div>

}
export default AddModal