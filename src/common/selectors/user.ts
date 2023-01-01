import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Right } from '../../reducers/userSlice'

const selectUserItem = (state: RootState) => state.user.useritem
const selectApplicationUser = (state: RootState) => state.user.user
export const selectsUserItemRights = createSelector(selectUserItem, user => {
  const processedRights: Right[] = []
  user.rights?.forEach((item: Right) => {
    if (item.entity === 'applications') {
      processedRights[0] = item
    }
    else if (item.entity === 'users') {
      processedRights[1] = item
    }
    else {
      processedRights[2] = item
    }
  })
  return processedRights
})
export const selectApplicationUserRights = createSelector(selectApplicationUser, user => {
  type rightsObj = {
    applications?: {
      create: boolean,
      read: boolean,
      update: boolean,
      delete: boolean
    }, users?: {
      create: boolean,
      read: boolean,
      update: boolean,
      delete: boolean
    }, checkupPlanPlace?: {
      create: boolean,
      read: boolean,
      update: boolean,
      delete: boolean
    }
  }
  const processedRights: rightsObj = {}
  user.rights?.forEach((item: Right) => {
    processedRights[item.entity as keyof rightsObj] = { create: item.create, read: item.read, update: item.update, delete: item.delete }
  })
  const isApplicationOneRight = processedRights.applications?.create || processedRights.applications?.read || processedRights.applications?.update || processedRights.applications?.update
  const isUsersOneRight = processedRights.users?.create || processedRights.users?.read || processedRights.users?.update || processedRights.users?.update
  return { processedRights, isApplicationOneRight, isUsersOneRight };
})