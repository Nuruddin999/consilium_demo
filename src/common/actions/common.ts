import { createAction } from "@reduxjs/toolkit"
export const Types = {
    getListItem: 'listitem/getlistitem',
}
export const getListItemAction = createAction(Types.getListItem, function prepare(id: string, itemurl: string, callback: any) {
    return {
        payload: {
            id, itemurl, callback
        },
    }
})