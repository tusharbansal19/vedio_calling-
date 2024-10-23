import { useSelector } from "react-redux";

function Showcounterr(){
    
    let counter =useSelector((e)=>e.counter)
    return <>
     <p class="lead mb-4">Counter  value is : {counter}</p>
    </>
}
export default Showcounterr;