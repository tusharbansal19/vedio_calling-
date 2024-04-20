import "./TDbuttoncss.css";
function TDbutton({hd,e}){

    return <>
    <button onClick={()=>hd(e)} key={e} value ={e}  className="red">{e}</button></>
}
export default TDbutton;