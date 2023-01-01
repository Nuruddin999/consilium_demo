import { registeredUser } from '../actions/user';
import { diagnostApi } from './index';

export const loginApi = async (email: string, password: string) => {
  const response = await diagnostApi.post('/login', {
    email, password
  })
  return response.data
}
export const registerApi = async (body: registeredUser) => {
  const response = await diagnostApi.post('/registration', {
    ...body
  })
  return response.data
}
export const checkAuth = async () => {
  const response = await diagnostApi.post('/refresh', { refreshToken: localStorage.getItem('refreshToken') })
  return response.data
}
export const checkHasSuperAdmin = async () => {
  const response = await diagnostApi.get('/superadmn')
  return response.data
}
export const logOut = async () => {
  const response = await diagnostApi.post('/logout', { refreshToken: localStorage.getItem('refreshToken') })
  return response.data
}
export const changeIsDeletedApi = async (email: string) => {
  const response = await diagnostApi.post('/changedel', {
    email
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}
export const getAllUsersApi = async (page: number,
  limit: number,
  email: string,
  name: string,
  speciality: string,
  phone: string) => {
  const response = await diagnostApi.get('/users', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
    params: { page, limit, email, name, speciality, phone }
  })
  return response.data
}
/**
 * Удаление одного пользователя по id.
 * @param {number} id Id заключения.
 */

export const deleteUserApi = async (id: string) => {
  const response = await diagnostApi.get(`/userdel/${id}`,
    {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
    })
  return response.data
}
export const updateRightApi = async (entity: string, field: string, value: boolean, userId: string) => {
  const response = await diagnostApi.post('/rightupd', {
    entity, field, value, userId
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}
export const updatePrimaryApi = async (email: string, speciality: string, phone: string) => {
  const response = await diagnostApi.post('/usrupd', {
    email, speciality, phone
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}

export const upLoadFileApi = async (files: Array<any>, id: string, onUploadProgress?: any) => {
  let formData = new FormData();
  formData.append("file", files[0]);
  formData.append("userid", id);
  const response = await diagnostApi.post('/upload', formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress
  })
  return response.data
}


export const getFilesList = async (id:string) => {
  const response = await diagnostApi.get(`/files/${id}`,  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  })
  return response.data
}


