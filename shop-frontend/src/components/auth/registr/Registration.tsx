import { Formik } from "formik";

interface IRegistration{
    username:string,
    password:string,
    confirm:string
}

const Registration = ()=>{
  const initialValues: IRegistration = {
    username: "",
    password: "",
    confirm: "",
  };
  const onNext = (item: IRegistration) => {
    console.log("Registation item: ", item);
  };

  return (
    <>
      <div className="relative w-full flex flex-col justify-center mt-[150px] ">
        <div className="max-w-[500px] w-full mx-auto bg-gray-50 p-4">
          <Formik initialValues={initialValues} onSubmit={onNext}>
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <h2 className=" text-4xl font-bold text-center py-6 flex flex-row justify-center">
                  <img
                    className="h-8 sm:h-10 pr-4"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                  Registration
                </h2>
                <div className="flex flex-col py-2">
                  <label htmlFor="username" className="text-lg font-[500]">
                    Username
                  </label>
                  <input
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
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="confirm" className="text-lg font-[500]">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 my-3 text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
                >
                  Registration
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default Registration;