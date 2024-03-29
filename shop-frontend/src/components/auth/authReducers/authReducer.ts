import { AuthUserActionType, IAuthUser, IUser } from "../login/store/types";



const initState : IAuthUser = {
    isAuth: false
}

export const AuthReducer = (state=initState, action: any) : IAuthUser => {
    switch(action.type) {
        case AuthUserActionType.LOGIN_USER: {
            const user : IUser= action.payload as IUser;
            return {
                ...state,
                isAuth: true,
                user: user
            }
        }
        case AuthUserActionType.GOOGLE_LOGIN_USER: {
            const user : IUser= action.payload as IUser;
            return {
                ...state,
                isAuth: true,
                user: user
            }
        }
        case AuthUserActionType.LOGOUT_USER: {
            
            return {
                ...state,
                isAuth: false,
                user: undefined
            }

        }
    }
    return state;
}