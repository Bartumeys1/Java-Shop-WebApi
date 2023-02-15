
import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

const App =() => {

  useEffect(() => {
    axios.get("http://localhost:8083/api/categories").then(res =>{
      console.log("Server response",res);
    });
  }, [])
  
  return (
<>
<h1>Site</h1>
</>
  );
}

export default App;
