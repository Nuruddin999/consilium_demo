import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { all, call, put } from "redux-saga/effects"
import { setError, setUserItemStatus } from "../../reducers/ui"
import { getListItemById } from "../api/api"

/**
 * Получение заключения по Id.
 * @param {Object} getApplication .
 */
 export function* fetchListItem(getApplication: { type: 'listitem/getlistitem', payload: { id: string, itemurl:string, callback: ActionCreatorWithPayload<any,string> } }): any {
    try {
      yield put(setUserItemStatus('pending'))
      const { id, callback, itemurl } = getApplication.payload
      const response = yield call(getListItemById, id, itemurl)
      if (response) {
        yield all([yield put(setUserItemStatus('ok')),put(callback({ ...response }))])
      }
    } catch (e: any) {
      yield all([yield put(setUserItemStatus('no')),put(setError('Произошла ошибка, попробуйте позже'))])
    }
  }

