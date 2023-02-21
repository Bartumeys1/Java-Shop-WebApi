import { Field, Formik } from "formik";

interface ICreateCategoryItem{
  name: string,
  description:string,
  image:string
}

const CreateCategory = () =>{
    const initialValues:ICreateCategoryItem = {
		name: "",
    description:"",
    image:""
	};

  const handelSubmit = (category:ICreateCategoryItem) =>{
    console.log("Submit...: ", category);
  }
return (
  <>
    <div className=" w-auto">
      <div>
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-3xl font-medium leading-6 text-gray-900 text-center mt-3">
              Category
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Formik
            initialValues={initialValues}
            onSubmit={handelSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className=" max-w-[500px] mx-auto">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <Field as="input"
                            id="name"
                            name="name"
                            className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative "
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <Field as="textarea"
                          id="description"
                          name="description"
                          className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full h-[300px]  relative resize-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="image"
                          className="block text-lg font-medium text-gray-700"
                        >
                          ImageUrl
                        </label>
                        <Field as="input"
                          id="image"
                          name="image"
                          className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative"
                        />
                      </div>
                    </div>
                    <div className=" px-auto py-3 text-center sm:px-6">
                      <button
                        type="submit"
                        className=" rounded-md border border-transparent bg-indigo-600 px-4 py-2  font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </>
);
}
export default CreateCategory;

