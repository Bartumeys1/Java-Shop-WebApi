import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSelector } from "react-redux";
import { IAuthUser } from "../auth/login/store/types";

const UserProfile = () =>{
    const { executeRecaptcha } = useGoogleReCaptcha();
    const {isAuth, user} = useSelector((store: any)=> store.auth as IAuthUser);
    
     useEffect(()=>{

        console.log(user);
     },[]);

    return (
        <>
        <h1>Profile {user?.email} , id: {}</h1>
        </>
    );
}
export default UserProfile;