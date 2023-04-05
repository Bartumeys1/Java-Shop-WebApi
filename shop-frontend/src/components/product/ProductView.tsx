import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APP_ENV } from "../../env";
import Loader from "../common/loader";
import { IProductItem } from "../admin/product/store/type";
import http from "../../http_common";

const Product = () => {
  const [list, setlist] = useState<IProductItem[]>([]);
  const [isLoaded , setLoaded] = useState<boolean>(false);
  const {category_id} = useParams();

  useEffect(() => {
    console.log("category id : ",category_id);
if(category_id === undefined)
    getAllDataFromServer();
    else
    getAllDataByCategoryId(Number(category_id));
  }, []);


  const getAllDataFromServer = async () => {
    try {
      await http
        .get<IProductItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/products`)
        .then((result) => {
          const { data } = result;
          setlist(data);
          setLoaded(true);
        });
    } catch (error: any) {
      console.log("Error: ", error);
      setLoaded(true);
    }
  };

  const getAllDataByCategoryId = async (id:number) => {
    try {
      await http
        .get<IProductItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/products/category${id}`)
        .then((result) => {
          const { data } = result;
          setlist(data);
          setLoaded(true);
        });
    } catch (error: any) {
      console.log("Error: ", error);
      setLoaded(true);
    }
  };


  const elements = list.map((product) => (
    <div key={product.name+"_"+product.id} className="relative">
      <div className="group relative">
        <div className="relative h-[100%] w-[100%] overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
          <img
            src={"http://localhost:8083/files/600_" + product.images[0]}
            alt={product.images[0]}
            className="h-[100%] w-[100%] object-scale-down object-center"
          />
        </div>
        <h3 className="mt-8 text-sm text-gray-900">
          <Link to={`/product/info/${product.id}`}>
            <span className="absolute inset-0" />
            <p className="font-bold text-xl text-center">{product.name}</p>
          </Link>
        </h3>
        <p className="text-base font-semibold text-gray-500">
          {"Опис продукту: "}
          {product.description}
        </p>
        <p className="text-xl font-bold text-gray-900">
          {"Ціна: "}
          {product.price}
          {" грн."}
        </p>
      </div>
    </div>
  ));

  return (
    <>
     {!isLoaded &&
      <Loader/>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {"Список продуктів"}
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-3 lg:space-y-0">
            {elements}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
