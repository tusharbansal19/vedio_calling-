import { useState } from "react";
import Done from "./Done";
import Inp from "./Inp";
import Alltxk from "./alltxk";
import "./app1.css";
import { Dataset } from "./dataiteam";

function App() {
  const [datalist, fntx] = useState([{task:"by ghee",date:"today"}]);
  const addNew=(task1, date1)=> {
    fntx((currentval) => [...currentval, { task: task1, date: date1 }]);
  }
  function deleteItem(listname) {
    let newtx = datalist.filter((e) => e.task != listname);
    fntx(newtx);
  }

  return (
    <>
      <Dataset.Provider value={datalist}>
        <div className="ctr-1">
          <div className="container1">
            <div id="h11"><h1>TO DO App</h1></div>
            <Inp></Inp>
            <Done></Done>
            <Alltxk></Alltxk>
          </div>
        </div>
    
      </Dataset.Provider>
    </>
  );
}

export default App;
