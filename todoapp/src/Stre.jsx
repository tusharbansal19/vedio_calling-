// import "./inp.css";

import { createContext } from "react";
import { MdDelete } from "react-icons/md";
import { Dataset } from "./dataiteam";
import "./stre.css";

function Stre({a,b}){
  const { deleteItem }=createContext(Dataset);
    return<>{
      console.log(a,b)
    }
    <div class="container text-center ctr">
  <div class="re">
    <div class="col-6 cll" id="inp1">
      {a}
    </div>
    <div class="col-4" id="dt1">
      {b}
    </div>
    <div class="col-2">
    <button type="button" class="btn btn-danger" onClick={()=>deleteItem(a)} ><MdDelete />
</button>

    </div>
  </div>
</div>
    </>
}
export default Stre;