import { useContext } from "react";
import Stre from "./Stre";
import { Dataset } from "./dataiteam";

function Alltxk(){
    let {datalist}=useContext(Dataset);
    
    // let delo=dr.delo;

    return<>
    {datalist.map((ta) => (
        <Stre key={ta.task} a={ta.task} b={ta.date}></Stre>
    ))}
    </>
}
export default Alltxk;