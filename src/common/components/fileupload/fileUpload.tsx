import React from "react";
import { IconButton, Typography } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './style.auth.scss'
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

type FileUploadProps = {
  files: Array<File>,
  setFiles: (el: Array<File>) => void
}
export const FileUpload = ({ files, setFiles }: FileUploadProps): React.ReactElement => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const { fileProgress } = useSelector((state: RootState) => state.ui)
  return <div className='file-upload'>
    <div>{
      !isEmpty(files) && Array.from(files).map(el=><Typography>
        {el.name}
      </Typography>)}</div>
      <IconButton color="primary" aria-label="upload picture" onClick={(e: any) => {
      if (hiddenFileInput.current !== null) {
        hiddenFileInput.current.click();
      }
    }}>
      <PhotoCamera />
    </IconButton>
    <input type="file" hidden ref={hiddenFileInput} onChange={(e: any) => {
        setFiles(e.target.files)
    }}/>
  </div>
}