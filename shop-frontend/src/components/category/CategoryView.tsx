import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "../common/categoryTable";
import { ICategoryItem } from "./store/type";

const Categories:React.FC=()=>{

    const [list , setList] = useState<ICategoryItem[]>([]);
    useEffect(() => {
      axios.get("http://localhost:8083/api/categories").then(res =>{
        console.log("Server response",res);
        const {data} = res;
        setList(data);
      });
    // setList(prev =>{
    //     return[{id:1, name:"first"},{id:2, name:"second"},{id:3, name:"three"}]});
    }, [])

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 style={{textAlign:"center"}}>Categories</h1>
            </div>
          </div>
          <div className="row">
            <div className="col" style={{display:"flex" , justifyContent:"center" }}>
              <CategoryTable list={list} />
            </div>
          </div>
        </div>
      </>
    );
}
export default Categories;