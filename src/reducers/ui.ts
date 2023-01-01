import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  status: string,
  userItemStatus:string,
  isModalOpened: boolean,
  addUserStatus:string,
  isCircular: boolean,
  fileProgress: number,
  fileUploadStatus: string,
  errorMessage: string

}

const initialState: UiState = {
  status: 'none',
  userItemStatus:'none',
  addUserStatus:'none',
  isModalOpened: false,
  isCircular: false,
  fileProgress: 0,
  fileUploadStatus: 'none',
  errorMessage:''
};


export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setUserItemStatus: (state, action: PayloadAction<string>) => {
      state.userItemStatus = action.payload
    },
    setAddUserStatus: (state, action: PayloadAction<string>) => {
      state.addUserStatus = action.payload
    },
    openModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpened = !state.isModalOpened
    },
    setCircular: (state, action: PayloadAction<boolean>) => {
      state.isCircular = action.payload
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.fileProgress = action.payload
    },
    setFileUploadStatus: (state, action: PayloadAction<string>) => {
      state.fileUploadStatus = action.payload
    },
    setError:(state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
  },
});

export const { setStatus, openModal, setCircular, setProgress, setFileUploadStatus, setError,setUserItemStatus, setAddUserStatus } = uiSlice.actions;

export default uiSlice.reducer;
