import { useState } from "react";
import css from "./App.module.css";
import Outp from "./Outpt";
import TDbutton from "./TDbuttton";
// import Ininpt from "./Ininp";

function App() {
  let z = [
    "CV",
    "CLR",
    "1",
    "2",
    "+",
    "3",
    "4",
    "-",
    "5",
    "6",
    "*",
    "7",
    "8",
    "/",
    "=",
    "9",
    "0",
    ".",
  ];
  let [hodd ,holdfun]=useState("");
  let [xv,xvfun]=useState("");
  let [Vlulu, Vlufun] = useState([]);
  let fun=(e)=>{
    if(e==="CLR"){
      if(xv.lenght===1)
      xvfun("");
let temp=xv.slice(0,xv.length-1);
xvfun(temp);
    }
    else if(e==="CV"){
      xvfun("");
    }
    else if(e==="+"||e==="-"||e==="*"||e==="/"){
      if(hodd==="+"||hodd==="-"||hodd==="*"||hodd==="/"){
        holdfun(e);
        let temp=xv.slice(0,xv.length-1);
xvfun(temp+e);
      }
      else{
        xvfun(xv+e);
        holdfun(e);
      }

    }
    else if(e==="="){
      xvfun(`${eval(xv)}`);
    }
    else{
      xvfun(xv+e);
      holdfun(e);
    }}
  return (
    <>
      <center className={css.container}>
        <div>
        TD calsi
          </div>
        <Outp eh={xv}></Outp>

        <div className={css.container2}>
          {
          z.map((e) =>(
            <TDbutton hd={fun} key={e} e={e}>
            </TDbutton>
          ))
        }\

        </div>

      </center>













      {/* <Ufeed st={fun} vr={Crsvalue}></Ufeed>
      {Crsvalue}; */}
    </>
  );
}

export default App;
