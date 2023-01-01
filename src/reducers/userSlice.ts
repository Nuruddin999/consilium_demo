import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialRights } from '../constants';


export type Right = {
  entity: string,
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean
}
export interface User {
  id: string,
  phone: string;
  role: string,
  name: string,
  email: string,
  speciality: string,
  isDeletedPlace?: boolean,
  urlSignPath?: string,
  signFileName?: string,
  rights?: Array<Right>
}
interface UserState {
  user: User,
  users: Array<User>,
  useritem: User,
  isLoading: boolean,
  reqStatus: string,
  hasSuperUser?: boolean,
  count: number,
}
const initialState: UserState = {
  user: {
    id: '',
    phone: '',
    role: 'doctor',
    name: '',
    email: '',
    speciality: '',
    rights: [],
    isDeletedPlace: false
  },
  useritem: {
    id: '0',
    phone: '',
    role: 'doctor',
    name: '',
    email: '',
    speciality: '',
    urlSignPath:'',
    rights: initialRights,
    isDeletedPlace: false
  },
  users: [],
  isLoading: false,
  reqStatus: 'no',
  hasSuperUser: true,
  count: 0
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    saveUser: (state, action: PayloadAction<{ id: string, email: string, phone: string, role: string, name: string, speciality: string, rights: Array<Right>, isDeletedPlace: boolean, isLoading: boolean, reqStatus: string, urlSignPath?: string, signFileName?: string, }>) => {
      const { name, phone, role, email, speciality, id, isDeletedPlace, rights, signFileName, urlSignPath } = action.payload
      state.user = { id: String(id), phone, role, name, speciality, email, isDeletedPlace, signFileName, urlSignPath }
      state.user.rights = [...rights]
      state.isLoading = action.payload.isLoading
      state.reqStatus = action.payload.reqStatus
    },
    changeLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    changeReqStatus: (state, action: PayloadAction<string>) => {
      state.reqStatus = action.payload
    },
    saveSuperUser: (state, action: PayloadAction<boolean>) => {
      state.hasSuperUser = action.payload
    },
    saveUsers: (state, action: PayloadAction<{ users: Array<User>, count: number }>) => {
      state.users = action.payload.users
      state.count = action.payload.count
    },
    saveUserItem: (state, action: PayloadAction<{ id: string, email: string, phone: string, role: string, name: string, speciality: string, rights: Array<Right>, isDeletedPlace: boolean, isLoading: boolean, reqStatus: string, urlSignPath?: string, signFileName?: string }>) => {
      const { name, phone, role, email, speciality, id, isDeletedPlace, rights, signFileName, urlSignPath} = action.payload
      state.useritem = { id, phone, role, name, speciality, email, rights, isDeletedPlace, signFileName, urlSignPath }
      state.isLoading = action.payload.isLoading
      state.reqStatus = action.payload.reqStatus
    },
    saveRightsInUserItem: (state, action: PayloadAction<{ rights?: Array<Right> }>) => {
      const { rights } = action.payload
      state.useritem.rights = rights
    },
    saveRightsInApplicationUser: (state, action: PayloadAction<{ rights?: Array<Right> }>) => {
      const { rights } = action.payload
      state.user.rights = rights
    },
    savePhone: (state, action: PayloadAction<string>) => {
      state.useritem.phone = action.payload
    },
    saveEmail: (state, action: PayloadAction<string>) => {
      state.useritem.email = action.payload
    },
    saveIsDeletedPlaceInUser: (state, action: PayloadAction<boolean>) => {
      state.user.isDeletedPlace = action.payload
    },
    saveUserItemSignFileInfo: (state, action: PayloadAction<{ urlSignPath: string, signFileName: string }>) => {
      const { urlSignPath, signFileName } = action.payload
      state.useritem.urlSignPath = urlSignPath
      state.useritem.signFileName = signFileName
    },
    saveUserItemSpeciality: (state, action: PayloadAction<string>) => {
      state.useritem.speciality = action.payload
    },
  },
});

export const { saveUser, changeReqStatus, changeLoadStatus, saveSuperUser, saveUsers, saveUserItem, saveRightsInUserItem, saveRightsInApplicationUser, saveEmail, savePhone, saveIsDeletedPlaceInUser, saveUserItemSignFileInfo, saveUserItemSpeciality } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default userSlice.reducer;
