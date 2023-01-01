import { applicationForAdd } from '../actions/application';
import { applicationInitialState } from '../reducers/applicationItemSlice';
import { diagnostApi } from './index';
export const addApplicationApi = async (application: applicationForAdd) => {
  const response = await diagnostApi.post('/application', {
    ...application,
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}
/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @returns
 */
export const getApplicationApi = async (page: number,
  creator: string,
  limit: number,
  manager: string,
  patientName: string,
  patientRequest: string,
  fundName: string,
  fundRequest: string) => {
  const response = await diagnostApi.get('/appls', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
    params: { page, limit, manager, patientName, patientRequest, fundName, fundRequest, creator }
  })
  return response.data
}
/**
 * Запрос обновления одного заключения.
 * @param {Object} application обновленное заключение.
 */
export const updateOneApplicationApi = async (application: applicationInitialState) => {
  const response = await diagnostApi.post('/updappl', {
    ...application,
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}
/**
 * Изменение опции удалении места в плане лечения в печатной версии
 */
export const changeIsDeletedPlace = async (id: string) => {
  const response = await diagnostApi.post('/changedeloptn', {
    id
  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
  return response.data
}
/**
 * Удаление одного заключения по id.
 * @param {number} id Id заключения.
 */
export const deleteOneApplicationApi = async (id: string) => {
  const response = await diagnostApi.get(`/applicationdel/${id}`,
    {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
    })
  return response.data
}


