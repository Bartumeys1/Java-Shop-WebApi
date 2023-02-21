import { Field, Formik } from "formik";
import { Link } from "react-router-dom";

interface ILoginItem{
    username:string,
    password:string
}

const Login = () =>{
    const initialValues:ILoginItem={
        username:"",
        password:""
    }
    const handleLogin=(item:ILoginItem)=>{
        console.log("login data: ",item);
        //send data and get response
        //redirect....
    }
    return (
      <>
        <div className="relative w-full flex flex-col justify-center mt-[150px] ">
          <div className="max-w-[400px] w-full mx-auto bg-gray-50 p-4">
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <h2 className=" text-4xl font-bold text-center py-6 flex flex-row justify-center">
                    <img
                      className="h-8 sm:h-10 pr-4"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                    LOGIN
                  </h2>
                  <div className="flex flex-col py-2">
                    <label htmlFor="username" className="text-lg font-[500]">
                      Username
                    </label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <label htmlFor="password" className="text-lg font-[500]">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2 ">
                    <button
                      type="submit"
                      className="w-full py-2 my-2 text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign In
                    </button>
                    <Link
                      to="/registration"
                      className=" text-center text-indigo-500 text-lg mt-3"
                    >
                      Create account?
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
}
export default Login;