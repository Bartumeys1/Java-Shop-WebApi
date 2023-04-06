import { IRegisterUser, RegistrationUserActionType } from "../registr/store/types";


const initState : IRegisterUser = {
    isRegistration: false
}

export const RegistrateReducer = (state=initState, action: any) : IRegisterUser => {
    switch(action.type) {
        case RegistrationUserActionType.REGISTRATION_USER: {
            return {
                ...state,
                isRegistration: true,
                user: action.payload.user
            }
        }
       
    }
    return state;
}