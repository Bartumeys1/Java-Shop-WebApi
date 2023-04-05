import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";

const Login = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LcOLl8lAAAAABYxJMr7yvqwa0x4p45BsoTT0u1P">
            <LoginPage/>
        </GoogleReCaptchaProvider>
    )
}


export default Login;