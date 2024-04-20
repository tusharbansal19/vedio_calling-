import "./App.css";
import TDbutton from "./TDbuttton";
function Inpt({a,b,c}) {
  
  return (
    <>
    {console.log(a,b,c)}
  <div class="container text-center ">
  <div class="row row1">
    <div class="col">
      <TDbutton nm={a}></TDbutton>
    </div>
    <div class="col">
      <TDbutton nm={b}></TDbutton>
    </div>
    <div class="col">
      <TDbutton nm={c}></TDbutton>
    </div>
  </div>
</div>
    </>
  )
}

export default Inpt;
