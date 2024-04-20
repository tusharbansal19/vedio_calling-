import TDbutton from "./assets/TDbutton";
function App(){
  let x;
  const prt=()=>{
      x=prompt("enter your thoughts");
      return;

  }
  const give=()=>{
    let z=prompt("are you want to show this message");
    if(z=="Y"){
      return x; 
    }
  }
  return<div>
    <TDbutton></TDbutton>
  <h1>hi mare ANU</h1>the part{prt()}{} your message{give()};
  </div>
}
export default App;