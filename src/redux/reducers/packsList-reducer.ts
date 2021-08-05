import {ThunkAction} from "redux-thunk"
import {CardPacksResponseType, GetPacksResponseType, packsListAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum PACKS_LIST_ACTION_TYPE {
    SET_PACKS_LIST = "SET-PACKS-LIST",
    CHANGE_TABS_SHOW_PACKS_STATUS = "CHANGE_TABS_SHOW_PACKS_STATUS"
}

const initialState = {
    cardPacks: [] as Array<CardPacksResponseType>,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0,

    user_id: "",

    tabsShowPacksStatus: 1 as TabsShowPacksStatusType
}

type InitialStateType = typeof initialState

export const packsListReducer = (state = initialState, action: PacksListReducerActionsType): InitialStateType => {
    switch (action.type) {
        case PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST:
            return {
                ...state,
                ...action.packsState
            }
        case PACKS_LIST_ACTION_TYPE.CHANGE_TABS_SHOW_PACKS_STATUS:
            return {...state, tabsShowPacksStatus: action.tabsShowPacksStatus}
        default:
            return state
    }
}

// AC
const setPacksListStateAC = (packsState: GetPacksResponseType) => (
    {type: PACKS_LIST_ACTION_TYPE.SET_PACKS_LIST, packsState} as const)

const changesTabsShowPacksStatusAC = (tabsShowPacksStatus: TabsShowPacksStatusType) => (
    {type: PACKS_LIST_ACTION_TYPE.CHANGE_TABS_SHOW_PACKS_STATUS, tabsShowPacksStatus} as const)


// TC
export const fetchPacksStateTC = (pageNumber?: number, cardsPerPage?: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.getPacks(pageNumber, cardsPerPage)
            .then(res => {
                console.log(res.data)
                dispatch(setPacksListStateAC(res.data))
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                //dispatch(setAppStatusAC("failed"))
            })
    }

export const fetchPacksStateAfterTabsShowTC = (tabsShowPacksStatus: TabsShowPacksStatusType, user_id?: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.getPacksAfterTabsShow(user_id)
            .then(res => {
                console.log(res.data)
                dispatch(setPacksListStateAC(res.data))
                changesTabsShowPacksStatusAC(tabsShowPacksStatus)
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                //dispatch(setAppStatusAC("failed"))
            })
    }

export const addNewPackTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        /* packsListAPI.addPack()
             .then(res => {
                 dispatch(fetchPacksStateTC())
                 // dispatch(setAppStatusAC("succeeded"))
             })
             .catch(e => {
                 console.log(e.message)
                 // dispatch(setAppStatusAC("failed"))
             })*/
    }

/*export const deletePackTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    (dispatch) => {
        // dispatch(setAppStatusAC("loading"))
        packsListAPI.deletePack()
            .then(res => {
                dispatch(fetchPacksStateTC())
                // dispatch(setAppStatusAC("succeeded"))
            })
            .catch(e => {
                console.log(e.message)
                // dispatch(setAppStatusAC("failed"))
            })
    }*/

export type TabsShowPacksStatusType = 0 | 1
export type PacksListReducerActionsType = ReturnType<typeof setPacksListStateAC>
    | ReturnType<typeof changesTabsShowPacksStatusAC>