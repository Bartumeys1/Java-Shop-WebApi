import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import UserProfile from "./UserProfile";
import { APP_ENV } from "../../env";

const Profile = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.REACT_RECAPTCHA_KEY}>
            <UserProfile />
        </GoogleReCaptchaProvider>
    )
}
export default Profile;