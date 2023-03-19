import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { start } from "repl";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "../../category/store/type";
import Loader from "../../common/loader";
import TestSlider from "../../common/slider/testSlider";
import TestSlider2 from "../../common/slider/testSlider2";
import { IProductItem } from "../store/type";

const InfoProductPage: React.FC = () => {
  const [listCategories, setListCategories] = useState<ICategoryItem[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [productModel, setProductModel] = useState<IProductItem>({
    id: 0,
    name: "test",
    price: 123.22,
    description: "test",
    category: "test",
    category_id: 0,
    images: [],
  });

  const params = useParams();

  useEffect(() => {
    getDataFromServer();
  }, []);

  const getDataFromServer = async () => {
    try {
      await axios
        .get<ICategoryItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
        .then((res) => {
          const { data } = res;
          setListCategories(data);
        });

      await axios
        .get<IProductItem>(
          `${APP_ENV.REMOTE_HOST_NAME}api/products/${params.id}`
        )
        .then((res) => {
          const { data } = res;
          setProductModel(data);
          setLoaded(true);
        });
    } catch (error: any) {
      console.log("Щось пішло не так: ", error);
      setLoaded(true);
    }
  };

  const stars = [1, 2, 3, 4];
  const reviewStars = stars.map((star) => {
    return (
      <svg
      key={star}
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    );
  });

  return (
    <>
    {!isLoaded&& <Loader/>}
      {/* { <!-- component -->} */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
            /> */}
            <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200">
            <TestSlider2 imagesList={productModel.images}/>

            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Назва товару
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productModel.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {reviewStars}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Відгуки</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>

              {/* Description */}
              <p className="leading-relaxed">
                {productModel.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Ціна:&nbsp;{productModel.price}&nbsp;грн.
                </span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Button
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default InfoProductPage;
