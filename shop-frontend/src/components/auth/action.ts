import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import setAuthToken from "../../helpers/setAuthToken";
import { AuthUserActionType, IUser } from "./login/store/types";
import { IRegistration, RegistrationUserActionType } from "./registr/store/types";


export const AuthUserToken = (token: string, dispatch: Dispatch<any>) => {
      const user = jwtDecode(token) as IUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: user
      });
      setAuthToken(token);
}
export const AuthGoogleUserToken = (token: string, dispatch: Dispatch<any>) => {
  const user = jwtDecode(token) as IUser;
  dispatch({
    type: AuthUserActionType.GOOGLE_LOGIN_USER,
    payload: user
  });
  setAuthToken(token);
}

export const RegistartionUser = (registerUser: IRegistration, dispatch: Dispatch<any>) => {

  dispatch({
    type: RegistrationUserActionType.REGISTRATION_USER,
    payload: registerUser
  });
}
