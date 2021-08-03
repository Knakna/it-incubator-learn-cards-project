import {Dispatch} from "redux"

const initialState: InitialStateType = {}

type InitialStateType = {}

export const cardsListReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "":
            return state
        default:
            return state
    }
}

// actions
export const templateAC = (body: any) => {
    return {type: "", body: body} as const
}

// thunks
/*export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    someAPI.someMethod()
        .then(res => {
            // dispatch(setIsLoggedInAC(true, res.data.data.email))
        })
        .catch((error) => {
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
        })
}*/

// types
type ActionsType = ReturnType<typeof templateAC>