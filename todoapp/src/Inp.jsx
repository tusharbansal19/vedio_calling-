import { createContext, useRef } from "react";
import { MdOutlineAlarmAdd } from "react-icons/md";
import { Dataset } from "./dataiteam";
import "./inp.css";

function Inp(){

  let {addNew}=createContext(Dataset);{
    // console.log(x.addNew);
  }
let nameref=useRef();
let dateref=useRef();
  function fee(){
    addNew (nameref.current.value,dateref.current.value);
    event.preventDefault();
    nameref.current.value="";
    dateref.current.value=""
  }
    return<>
    <form onSubmit={fee}>
   
<div class="container text-center">
  <div class="row">
    <div class="col-6">
      <input ref={nameref} type="text" className ="fl" placeholder="ENTER TAXK" />
    </div>
    <div class="col-4">
      <input type="date" ref={dateref}
className ="fl" />
    </div>
    <div class="col-2">
    <button  class="btn btn-success   ct fl"><MdOutlineAlarmAdd /></button>

    </div>
  </div>
</div>
      </form>
</>
}

export default Inp;
