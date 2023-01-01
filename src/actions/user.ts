import { createAction } from "@reduxjs/toolkit";
export const TYPES = {
  userLoginType: 'user/login',
  userRegisterType: 'user/register',
  userCheckType: 'user/check',
  userLogOut: 'user/logout',
  userCheckIsAdmin: 'user/checkIsSuperAdmn',
  userGetOne: 'user/getone',
  changeIsDeletedPlaceType: 'user/changeIsDeletedPlaceType',
  getByLetter: 'user/getByLetter',
  userDel: 'user/deleteone',
  userUpdateRights: 'user/updateRights',
  userUpdateSignFile:'user/signupdate',
  userUpdatePrimary:'user/updateprimary'
}
export type registeredUser = {
  email: string,
  password: string,
  name: string,
  phone: string,
  speciality: string,
  role: string,
  files:any[] | null
}

export const login = createAction(TYPES.userLoginType, function prepare(email: string, password: string) {
  return {
    payload: {
      email,
      password
    },
  }
})

export const changeIsDeletedPlaceAction = createAction(TYPES.changeIsDeletedPlaceType, function prepare(email: string) {
  return {
    payload: {
      email,
    },
  }
})


export const registerUser = createAction(TYPES.userRegisterType, function prepare(body: registeredUser) {
  return {
    payload: {
      ...body
    },
  }
})

export const updateRightsAction = createAction(TYPES.userUpdateRights, function prepare(entity: string, field: string, value: boolean, userId: string) {
  return {
    payload: {
      entity, field, value, userId
    },
  }
})
export const updatePrimaryData = createAction(TYPES.userUpdatePrimary, function prepare(email: string, speciality: string, phone: string) {
  return {
    payload: {
      email, speciality, phone
    },
  }
})
export const getUserByLetter = createAction(TYPES.getByLetter, function prepare(page: number,
  limit: number,
  email: string,
  name: string,
  speciality: string,
  phone: string) {
  return {
    payload: {
      page, limit, email, name, speciality, phone
    },
  }
})
export const deleteUser = createAction(TYPES.userDel, function prepare(id: string) {
  return {
    payload: {
      id
    },
  }
})

export const userSignFileUpdate = createAction(TYPES.userUpdateSignFile, function prepare(id: string, files:Array<File>) {
  return {
    payload: {
      id,
      files
    },
  }
})

export const checkUser = createAction(TYPES.userCheckType)
export const logOutUser = createAction(TYPES.userLogOut)
export const checkIsSuperAdmin = createAction(TYPES.userCheckIsAdmin)