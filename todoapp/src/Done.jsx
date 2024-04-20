import { createContext } from "react";
import "./Donecss.css";
import { Dataset } from "./dataiteam";
function Done(){
    const {datalist}=createContext(Dataset);
    // let tx=txtm.datae;
    return <>
  {datalist.length===0&& <h2>NO TAXK PENDING..
    </h2>} {console.log(datalist)}
    </>
}export default Done;