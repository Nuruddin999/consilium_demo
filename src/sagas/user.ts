import { updatePrimaryApi } from './../api/user';
import { call, put, select, all } from "redux-saga/effects"
import { getUserByLetter } from "../actions/user"
import { checkAuth, loginApi, logOut, registerApi, checkHasSuperAdmin, changeIsDeletedApi, getAllUsersApi, deleteUserApi, updateRightApi, upLoadFileApi, getFilesList } from "../api/user"
import { RootState } from "../app/store"
import { initialRights } from "../constants"
import { setFileUploadStatus, setProgress, setCircular, setError, setStatus, setAddUserStatus, setUserItemStatus } from "../reducers/ui"
import { changeLoadStatus, changeReqStatus, Right, saveIsDeletedPlaceInUser, saveRightsInApplicationUser, saveRightsInUserItem, saveSuperUser, saveUser, saveUserItemSignFileInfo, saveUsers, User } from "../reducers/userSlice"

type loginUserResponse = {
  accessToken: string,
  refreshToken: string,
  user: {
    id: string,
    email: string,
    name: string,
    phone: string,
    speciality: string,
    role: string,
    rights: Array<Right>,
    urlSignPath?: string,
    signFileName?: string,
    isDeletedPlace: boolean
  }
}
type allUsersResponse = {
  count: number,
  rows: Array<User>
}
/**
 * Вход в систему.
 * @param login .
 */
export function* loginUser(login: { type: 'user/login', payload: { email: string, password: string } }) {
  try {
    yield put(setCircular(true))
    const response: loginUserResponse = yield call(loginApi, login.payload.email, login.payload.password)
    const { accessToken, refreshToken, user } = response
    if (response) {
      localStorage.setItem('dtokenn', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      yield all(
        [put(setCircular(false)),
        put(saveUser({ ...user, rights: user.rights.length > 0 ? user.rights : initialRights, isLoading: false, reqStatus: 'ok', isDeletedPlace: false })),
        ])
    }
  } catch (e: any) {
    yield all(
      [put(setStatus('no')),
      put(setCircular(true)),
      put(setError(e.response ? e.response?.data?.message : 'Произошла ошибка, попробуйте позже')),
      ])
  }
}

/**
 * Регистрация нов пользователя.
 * @param body .
 */
export function* registerUser(body: { type: 'user/register', payload: { email: string, password: string, name: string, speciality: string, phone: string, role: string, files: Array<any> } }) {
  try {
    yield put(setAddUserStatus('pending'))
    const response: { user: string } = yield call(registerApi, { ...body.payload, files: null })
    if (response) {
      const fileUploadResponse: string = yield call(upLoadFileApi, body.payload.files, response.user)
      if (fileUploadResponse) {
        yield call(getFilesList, response.user)
        yield put(setAddUserStatus('ok'))
        const hasSuperUser: boolean = yield select((state: RootState) => state.user.hasSuperUser)
        if (!hasSuperUser) {
          yield put(saveSuperUser(true))
        }
        yield put(getUserByLetter(1, 10, '', '', '', ''))
      }
    }
  } catch (e: any) {
    yield all(
      [put(setAddUserStatus('no')),
      put(setError(e.response ? e.response?.data?.message : 'Произошла ошибка, попробуйте позже')),
      ])
  }

}
/**
 * Проверяем есть ли токен активности у пользователя
 */
export function* checkUserAuth() {
  try {
    yield put(changeLoadStatus(true))
    const { superAdmin } = yield call(checkHasSuperAdmin)
    if (!superAdmin) { yield put(saveSuperUser(false)) }
    const response: loginUserResponse = yield call(checkAuth)
    const { accessToken, refreshToken, user } = response
    if (response) {
      localStorage.setItem('dtokenn', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      yield put(saveUser({ ...user, rights: user.rights.length > 0 ? user.rights : initialRights, isLoading: false, reqStatus: 'ok' }))
    }
  } catch (e: any) {
    if (e.response) {
      yield put(changeReqStatus(e.response?.data?.message))
    }
    else {
      yield put(changeReqStatus('Неизвестаня ошибка'))
    }
    yield put(saveUser({ id: '0', name: 'empty', role: '', phone: '', email: '', speciality: '', rights: [], isLoading: false, reqStatus: 'ok', isDeletedPlace: false }))
  }
}

export function* logoutUser() {
  try {
    yield put(changeLoadStatus(true))
    const response: number = yield call(logOut)
    if (response) {
      localStorage.removeItem('dtokenn')
      localStorage.removeItem('refreshToken')
      yield put(saveUser({ id: '', email: '', role: '', name: 'empty', isLoading: false, reqStatus: 'no', rights: initialRights, phone: '', speciality: '', isDeletedPlace: false }))
      yield put(changeLoadStatus(false))
    }
  } catch (e: any) {
    if (e.response) {
      yield put(changeReqStatus(e.response?.data?.message))
    }
    else {
      yield put(changeReqStatus('Неизвестаня ошибка'))
    }
  }
}

export function* changeIsDeletedPlace(body: { type: 'user/changeIsDeletedPlaceType', payload: { email: string } }) {
  try {
    const response: loginUserResponse = yield call(changeIsDeletedApi, body.payload.email)
    const { user } = response
    if (response) {
      yield put(saveIsDeletedPlaceInUser(user.isDeletedPlace))
    }
  } catch (e: any) {
    if (e.response) {
      yield put(changeReqStatus(e.response?.data?.message))
    }
    else {
      yield put(changeReqStatus('Неизвестаня ошибка'))
    }
  }
}

/**
 * Сага получения списка пользователей.
 * @param addApplication
 */
export function* fetchUser(getUser: { type: 'user/getByLetter', payload: { page: number, limit: number, email: string, name: string, speciality: string, phone: string } }) {
  try {
    yield put(setStatus('pending'))
    const { page, limit, email, name, speciality, phone } = getUser.payload
    const response: allUsersResponse = yield call(getAllUsersApi, page, limit, email, name, speciality, phone)
    if (response) {
      const { rows, count } = response
      yield all([put(setStatus('ok')), put(saveUsers({ users: rows, count }))])
    }
  } catch (e: any) {
    yield all(
      [put(setStatus('no')),
      put(setError('Произошла ошибка, попробуйте позже')),
      ])
  }
}
/**
 * Сага обновления прав пользователя из списка пользователей.
 * @param addApplication
 */
export function* updateUserRights(updateRight: { type: 'user/updateRights', payload: { entity: string, field: string, value: boolean, userId: string } }) {
  try {
    const { entity, field, value, userId } = updateRight.payload
    const response: allUsersResponse = yield call(updateRightApi, entity, field, value, userId)
    if (response) {
      const rights: Array<Right> = yield select((state: RootState) => state.user.useritem.rights)
      const applicationUser: User = yield select((state: RootState) => state.user.user)
      const changedRights = rights.map((entityName) => entity === entityName.entity ? {
        ...entityName,
        [field]: value
      } : entityName)
      yield put(saveRightsInUserItem({ rights: changedRights }))
      if (applicationUser.id === userId) {
        yield put(saveRightsInApplicationUser({ rights: changedRights }))
      }
    }
  } catch (e: any) {
    yield put(setError('Произошла ошибка, попробуйте позже'))
  }
}
/**
 * Сага обновления специальности и телефона пользователя.
 * @param addApplication
 */
 export function* updateUserPrimary(updatePrimary: { type: 'user/updateRights', payload: { email: string, speciality: string, phone: string } }) {
  try {
    yield put(setUserItemStatus('pending'))
    const { email, speciality, phone } = updatePrimary.payload
    const response: allUsersResponse = yield call(updatePrimaryApi, email, speciality, phone)
    if (response) {
      yield put(setUserItemStatus('ok'))
    }
  } catch (e: any) {
    yield put(setUserItemStatus('Произошла ошибка, попробуйте позже'))
  }
}
/**
* Удаление  пользователя.
* @param {Object} delUser .
*/
export function* removeUser(delUser: { type: 'user/deleteone', payload: { id: string } }) {
  try {
    const { id } = delUser.payload
    const response: {} = yield call(deleteUserApi, id)
    if (response) {
      yield put(changeReqStatus('success'))
      yield put(getUserByLetter(1, 10, '', '', '', ''))
    }
  } catch (e: any) {
    if (e.response) {
      yield put(changeReqStatus(e.response?.data?.message))
    }
    else {
      yield put(changeReqStatus('Неизвестаня ошибка'))
    }
  }
}

/*обноаление картинки подписини у пользователя *
* @param {Object} delUser .
*/
export function* updateUserSignFile(updateUserSignFile: { type: 'user/signupdate', payload: { id: string, files: Array<File> } }) {
  try {
    yield put(setFileUploadStatus('pending'))
    const { id, files } = updateUserSignFile.payload
    const response: { urlSignPath: string, signFileName: string } = yield call(upLoadFileApi, files, id, () => { })
    if (response) {
      yield all([put(setFileUploadStatus('success')), put(saveUserItemSignFileInfo({ urlSignPath: response.urlSignPath, signFileName: response.signFileName }))])
    }
  } catch (e: any) {
    yield all([put(setFileUploadStatus('error')), put(setError("Произошла ошибка, попробуйте позже"))])
  }
}
