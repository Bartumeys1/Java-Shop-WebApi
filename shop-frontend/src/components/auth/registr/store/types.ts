export enum RegistrationUserActionType {
    REGISTRATION_USER="REGISTRATION_USER",
}

export interface IRegisterUser {
    isRegistration: boolean,
    user?: IRegistration
}

export interface IRegistration{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirm:string,
    reCaptchaToken:string
}