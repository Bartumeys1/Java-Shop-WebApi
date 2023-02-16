import { ICategoryItem } from "../../category/store/type";

interface ICategoryTableProps{
list:ICategoryItem[]
}

const CategoryTable:React.FC<ICategoryTableProps> = ({list}) =>{
  
  const itemRow = list.map((prev) => {
    return (
      <tr key={prev.id}>
        <th scope="row">{prev.id}</th>
        <td>{prev.name}</td>
        <td>
          <button
          style={{cursor:"pointer"}}
            onClick={() => {
              console.log("Select: ", prev.name);
            }}
          >
            Select!
          </button>
        </td>
      </tr>
    );
  });
    return(
        <table className="table" style={{width:800}}>
  <thead>
    <tr>
      <th scope="col" style={{width:200}}>ID</th>
      <th scope="col" >Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {itemRow}
  </tbody>
</table>
    );
}

export default CategoryTable;