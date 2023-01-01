import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.comments.scss'
import { changeComment } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";


/**
 * Компонент пояснений.
 * @returns {React.ReactElement}
 */
const Comments = (): React.ReactElement => {
  const comments = useSelector((state: RootState) => state.applicationItem.comments)
  const { processedRights } = useSelector((state: RootState) => selectApplicationUserRights(state))
  const dispatch = useDispatch()

  return <>
    <h4>Пояснения:</h4>
    <div className="comments-section">
      {comments.map((commentEl, index) => <div className='comments-section-wrapper' key={index + 1}>
        <Typography>{index + 1}</Typography>
        <TextField
          fullWidth
          className="text"
          placeholder={commentEl.title}
          size='small'
          multiline
          maxRows={4}
          value={commentEl.comment}
          onChange={(e) => processedRights.applications?.update &&  dispatch(changeComment({ index, comment: e.target.value }))}
          margin='normal'
        />
      </div>)}
    </div>
  </>
}
export default Comments